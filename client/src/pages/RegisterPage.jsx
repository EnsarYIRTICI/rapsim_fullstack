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

export default function RegisterPage() {
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
      label: "E-Posta",
      key: "email",
      input: {
        placeholder: "",
        type: "text",
      },
    },
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
    if (formData.email && formData.username && formData.password) {
      return (
        formData.username.length > 0 &&
        formData.username.length > 0 &&
        formData.password.length > 0
      );
    }
    return false;
  };

  const showErrorToast = (message) => {
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  };

  const backLoginForm = () => {
    navigate("/login");
  };

  const navigateRegisterPreferencePage = () => {
    navigate("/register/type");
  };

  const signUp = async () => {
    try {
      setIsLoading(true);

      const authData = await AuthService.SignUp(
        formData["email"],
        formData["username"],
        formData["password"]
      );

      register(authData);

      navigateRegisterPreferencePage();
    } catch (error) {
      console.log(error);

      showErrorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const customLogout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authId");
  };

  useEffect(() => {
    customLogout();
  }, []);

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

      <div className="w-6 h-full flex flex-column align-items-center justify-content-center relative">
        <BackButton onClick={backLoginForm} />

        <Toast ref={toastRef} />

        <div className="flex flex-column">
          <h1 className="align-self-center">Kayıt Ol</h1>

          {formFields.map((field) => (
            <div key={field.key} className="w-25rem mb-4 flex flex-column">
              <label className="mb-2">{field.label}</label>
              <InputText
                name={field.key}
                onChange={onInputChange}
                disabled={isLoading}
                type={field.input.type}
              />
            </div>
          ))}

          {isLoading ? (
            <Button
              className="w-25rem mb-6"
              label="Yükleniyor..."
              disabled={true}
            />
          ) : (
            <Button
              onClick={signUp}
              className="w-25rem mb-6"
              label="Kayıt Ol"
              disabled={!isFormValid()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
