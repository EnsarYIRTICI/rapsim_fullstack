import React, { useEffect, useState, useRef, Suspense } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import API from "../config/API";

import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { Toast } from "primereact/toast";

import ErrorBoundry from "../components/ErrorBoundry";

import InfoContainer from "../components/InfoContainer";
import AuthService from "../service/AuthService";
import AccountTabGeneral from "../components/AccountTabGeneral";
import Validation from "../utils/Validation";

export default function AccountPage() {
  const { authData } = useAuth();

  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toastRef = useRef(null);

  const userToken = authData.jwt;
  const userData = authData.user;
  const populateData = authData.populate;

  const showSuccessToast = (message) => {
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
    });
  };

  const showErrorToast = (message) => {
    toastRef.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        error: false,
      },
    }));
  };

  const onInputFocus = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        error: false,
      },
    }));
  };

  const onTabChange = (e) => {
    setActiveIndex(e.index);
  };

  const clearForms = () => {
    setFormData({});
  };

  const customValidate = (key, regex, error) => {
    let value = formData[key]?.value ?? "";
    let clearValue = Validation.ClearText(value);

    const isThatValid = regex(clearValue);

    if (!isThatValid) {
      setFormData((prev) => ({
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
      label: "Eski Şifre",
      key: "currentPassword",
      validate: () =>
        customValidate(
          "currentPassword",
          Validation.Password,
          "Parola en az 6 karakter içermeli!"
        ),
      input: {
        placeholder: "",
        type: "text",
      },
    },
    {
      label: "Yeni Şifre",
      key: "password",
      validate: () =>
        customValidate(
          "password",
          Validation.Password,
          "Parola en az 6 karakter içermeli!"
        ),
      input: {
        placeholder: "",
        type: "text",
      },
    },
    {
      label: "Yeni Şifre Tekrar",
      key: "passwordConfirmation",
      validate: () =>
        customValidate(
          "passwordConfirmation",
          Validation.Password,
          "Parola en az 6 karakter içermeli!"
        ),
      input: {
        placeholder: "",
        type: "text",
      },
    },
  ];

  const fieldsValidate = () => {
    let successfull = true;

    formFields.map((field) => {
      console.log(field);
      if (field.validate) {
        if (field.validate()) successfull = false;
      }
    });

    return successfull;
  };

  const changePassword = async () => {
    try {
      setIsLoading(true);

      console.log("formData:", formData);

      const data = await AuthService.ChangePassword(
        userToken,
        formData["currentPassword"]?.value,
        formData["password"]?.value,
        formData["passwordConfirmation"]?.value
      );

      clearForms();

      showSuccessToast("Password Change Successful");

      console.log("DATA FROM REQUEST", data);
    } catch (error) {
      console.log(error);

      showErrorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePasswordWithValidate = () => {
    if (fieldsValidate()) {
      changePassword();
    }
  };

  useEffect(() => {
    console.log("ACCOUNT AUTH DATA:", authData);
    console.log("ACCOUNT USER DATA:", userData);
    console.log("ACCOUNT POPULATE DATA:", populateData);
  }, []);

  return (
    <div className="flex-1 h-screen overflow-hidden overflow-y-scroll flex">
      <Toast ref={toastRef} />

      <div className="w-full flex flex-column">
        <h1 className="pl-3">Hesap</h1>

        <div className="pl-3 w-25rem flex flex-column">
          <TabMenu
            className="w-15rem"
            model={items}
            activeIndex={activeIndex}
            onTabChange={onTabChange}
          />

          {activeIndex === 0 ? (
            <>
              <span className="mt-2" />
              <ErrorBoundry fallback={<div>Error</div>}>
                <AccountTabGeneral
                  userData={userData}
                  populateData={populateData}
                />
              </ErrorBoundry>
            </>
          ) : (
            <>
              <span className="mt-5" />

              {formFields.map((field) => (
                <div key={field.key} className="w-20rem mb-3 flex flex-column">
                  <label className="mb-2">{field.label}</label>
                  <InputText
                    style={{
                      border: formData[field.key]?.error && "2px solid red",
                    }}
                    name={field.key}
                    value={formData[field.key]?.value || ""}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                    disabled={isLoading}
                  />
                </div>
              ))}

              <Button
                onClick={changePasswordWithValidate}
                className="w-8rem mt-5"
                label="Kaydet"
                disabled={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const items = [{ label: "Genel" }, { label: "Şifre Değiştir" }];
