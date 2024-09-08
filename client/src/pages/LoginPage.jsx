import React, { useRef, useState, useEffect } from "react";

import "../styles/LoginPage.css";

import { useAuth } from "../contexts/AuthContext";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import loginBackgroundImage from "../assets/images/login_background.jpg";
import { useNavigate } from "react-router-dom";
import { InputOtp } from "primereact/inputotp";
import { Toast } from "primereact/toast";

import BackButton from "../components/BackButton";

import AuthService from "../service/AuthService";
import UserInformationService from "../service/UserInformationService";
import UserService from "../service/UserService";
import OrgInfoService from "../service/OrgInfoService";
import CompInfoService from "../service/CompInfoService";
import Role from "../utils/RoleUtil";

export default function LoginPage() {
  const { matches, login, register } = useAuth();

  const navigate = useNavigate();

  const [token, setTokens] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [confirmDisabled, setConfirmDisabled] = useState(true);

  const [formData, setFormData] = useState({});

  const toastRef = useRef(null);

  const formFields = [
    {
      label: "Kullanıcı Adı",
      key: "username",
      input: {
        placeholder: "",
        type: "text",
      },
    },
    {
      label: "Şifre",
      key: "password",
      input: {
        placeholder: "",
        type: "password",
      },
    },
  ];

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    if (formData.username && formData.password) {
      return formData.username.length > 0 && formData.password.length > 0;
    }
    return false;
  };

  const navigateRegisterPage = () => {
    navigate("/register");
  };

  const navigateForgotPasswordPage = () => {
    navigate("/forgot");
  };

  const navigateRegisterPreferencePage = () => {
    navigate("/register/type");
  };

  const showErrorToast = (message) => {
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  };

  const onOtpChange = (e) => {
    let value = e.value;

    setTokens(value);

    if (value.length > 3) setConfirmDisabled(false);
    else setConfirmDisabled(true);
  };

  const backLoginForm = () => {
    setIsLoggedIn(false);
  };

  const twoFactor = () => {
    setIsLoggedIn(true);
  };

  const confirm = () => {};

  const signIn = async () => {
    try {
      setIsLoading(true);

      const authData = await AuthService.SignIn(
        formData["username"],
        formData["password"]
      );

      console.log("AUTHDATA", authData);

      const mePopulate = await UserService.MePopulate(authData.jwt);

      console.log("ME POPULATE", mePopulate);

      let userInfo;

      console.log("ROLE ID", mePopulate.role.id);

      if (mePopulate.role.id === Role.PERSONAL) {
        userInfo = await UserInformationService.FindPopulate(
          authData.jwt,
          authData.user.id
        );
      } else if (mePopulate.role.id === Role.COMPANY) {
        userInfo = await CompInfoService.FindPopulate(
          authData.jwt,
          authData.user.id
        );
      } else if (mePopulate.role.id === Role.ORGANISATION) {
        userInfo = await OrgInfoService.FindPopulate(
          authData.jwt,
          authData.user.id
        );
      } else {
        throw Error("UNSUPPORTED ROLE");
      }

      console.log(userInfo);

      let populateData = userInfo.data[0];
      let userData = populateData.attributes.userId.data;

      userData.attributes.role = mePopulate["role"];

      const customData = {
        jwt: authData.jwt,
        userId: authData.user.id,
        user: userData.attributes,
        populateId: populateData.id,
        populate: populateData.attributes,
      };

      login(customData);
    } catch (error) {
      console.log(error);

      showErrorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const customLogout = async () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("authId");
  // };

  // useEffect(() => {
  //   customLogout();
  // }, []);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {!matches && (
        <div className="w-6 h-full flex align-items-center justify-content-center">
          <img
            className="w-10 h-10 object-fit-cover"
            src={loginBackgroundImage}
          />
        </div>
      )}

      <Toast ref={toastRef} />

      <div className="login-forms">
        {!isLoggedIn ? (
          <>
            <h1 className="align-self-center">Giriş Yap</h1>

            {formFields.map((field) => (
              <div key={field.key} className="w-25rem mb-6 flex flex-column">
                <label className="mb-2">{field.label}</label>
                <InputText
                  name={field.key}
                  onChange={onInputChange}
                  disabled={isLoading}
                  type={field.input.type}
                />
              </div>
            ))}

            <div className="w-25rem mb-6 flex flex-column align-items-end">
              <Button
                onClick={navigateForgotPasswordPage}
                className="w-8rem p-0 text-blue-500font-bold shadow-none underline cursor-pointer"
                label="Şifremi Unuttum"
                text
                rounded
                disabled={isLoading}
              />
            </div>

            {isLoading ? (
              <Button
                className="w-25rem mb-6"
                label="Loading..."
                disabled={true}
              />
            ) : (
              <Button
                onClick={signIn}
                className="w-25rem mb-6"
                label="Giriş Yap"
                disabled={!isFormValid()}
              />
            )}

            <div className="flex align-items-center align-self-center mt-1 mb-6">
              <div className="mr-1">Hesabın yokmu?</div>

              <Button
                onClick={navigateRegisterPreferencePage}
                className="w-4rem p-0 text-teal-500 font-bold shadow-none"
                label="Kayıt Ol"
                text
                rounded
                disabled={isLoading}
              />
            </div>
          </>
        ) : (
          <>
            <BackButton onClick={backLoginForm} />

            <h1>Doğrulama</h1>

            <h3 className="text-600">
              Telefonunuza gelen doğrulama kodunu girinizs
            </h3>

            <InputOtp value={token} onChange={onOtpChange} integerOnly />

            <Button
              onClick={confirm}
              className="w-10rem mt-4"
              label="Onayla"
              disabled={confirmDisabled}
            />
          </>
        )}
      </div>
    </div>
  );
}
