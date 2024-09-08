import React, { useRef, useState } from "react";

import "../styles/RegisterPage.css";

import companyBackgroundImage from "../assets/images/company_background.jpg";
import RegisterForm from "../components/RegisterForm";

import { useAuth } from "../contexts/AuthContext";

import { Toast } from "primereact/toast";

import CompInfoService from "../service/CompInfoService";

import Validation from "../utils/Validation";

export default function CompanyRegisterPage() {
  const { matches, login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({});

  const toast = useRef(null);

  const showErrorToast = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  };

  const customValidate = (key, validationMethod, error) => {
    let value = inputData[key]?.value ?? "";
    let clearValue = Validation.ClearText(value);

    const isThatValid = validationMethod(clearValue);

    if (!isThatValid) {
      setInputData((prev) => ({
        ...prev,
        [key]: {
          value: clearValue,
          error: true,
        },
      }));

      showErrorToast(error);

      return true;
    }

    return false;
  };

  const formFields = [
    {
      label: "Şirket Adı",
      key: "name",
      activeIndex: 0,
      validate: () =>
        customValidate("name", Validation.NullOrEmpty, "İsim boş olamaz!"),
      input: {
        placeholder: "",
        type: "text",
      },
    },

    {
      label: "Vergi Kimlik Numarası",
      key: "vkn",
      activeIndex: 0,
      validate: () =>
        customValidate(
          "tckn",
          Validation.TCKN,
          "TCKN 11 karakter ve sayı içermelidir"
        ),
      input: {
        placeholder: "",
        type: "text",
        maxLength: 11,
      },
    },

    {
      label: "E-Posta",
      key: "email",
      activeIndex: 1,
      validate: () =>
        customValidate("email", Validation.Email, "Geçersiz E-Posta"),
      input: {
        placeholder: "",
        type: "text",
      },
    },
    {
      label: "Kullanıcı Adı",
      key: "username",
      activeIndex: 1,
      validate: () =>
        customValidate(
          "username",
          Validation.Username,
          "Kullanıcı Adı en az 8 karakter olmalı"
        ),
      input: {
        placeholder: "",
        type: "text",
      },
    },
    {
      label: "Şifre",
      key: "password",
      activeIndex: 1,
      validate: () =>
        customValidate(
          "password",
          Validation.Password,
          "Şifre en az 6 karakter olmalı"
        ),
      input: {
        placeholder: "",
        type: "password",
      },
    },
  ];

  const signUp = async () => {
    try {
      setIsLoading(true);

      const authData = await CompInfoService.SignUp(
        inputData["username"].value,
        inputData["email"].value,
        inputData["password"].value,

        inputData["name"].value,
        inputData["vkn"].value
      );

      console.log("AUTH DATA", authData);

      const customData = {
        jwt: authData.jwt,
        userId: authData.user.id,
        user: authData.user,
        populateId: authData.userInformation.id,
        populate: authData.userInformation,
      };

      console.log("CUSTOM DATA", customData);

      login(customData);
    } catch (error) {
      console.log(error);

      showErrorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {!matches && (
        <div className="w-6 h-full">
          <img
            className="w-full h-full object-fit-cover"
            src={companyBackgroundImage}
          />
        </div>
      )}

      <Toast ref={toast} />

      <RegisterForm
        inputData={inputData}
        setInputData={setInputData}
        stepsItems={stepsItems}
        stepsCount={2}
        formFields={formFields}
        formName={"Firma Kayıt Formu"}
        confirm={signUp}
        isLoading={isLoading}
      />
    </div>
  );
}

const stepsItems = [
  {
    label: "Kişi Bilgileri",
  },
  {
    label: "Güvenlik",
  },
];
