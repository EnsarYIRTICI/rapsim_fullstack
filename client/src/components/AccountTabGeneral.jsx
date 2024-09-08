import React, { useEffect, useState } from "react";

import InfoContainer from "./InfoContainer";
import Role from "../utils/RoleUtil";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import API from "../config/API";

import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from "primereact/tabview";
import { Toast } from "primereact/toast";

import ErrorBoundry from "../components/ErrorBoundry";

import AuthService from "../service/AuthService";
import Validation from "../utils/Validation";

import { Image } from "primereact/image";

import { Avatar } from "primereact/avatar";
import useForm from "../hooks/useForm";

export default function AccountTabGeneral({
  userData,
  populateData,
  showErrorToast,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { formData, error, change, clear, focus, fieldsValidate } = useForm({
    name: {
      value: populateData.name,
    },
    lastname: {
      value: populateData.lastname,
    },
    email: {
      value: userData.email,
    },
    username: {
      value: userData.username,
    },
  });

  const accountTypeName =
    userData.role.id === Role.PERSONAL
      ? "Bireysel Hesap"
      : userData.role.id === Role.COMPANY
      ? "Firma Hesabı"
      : userData.role.id === Role.ORGANISATION
      ? "Kurum Hesabı"
      : "Error";

  const lastname = populateData.lastname ?? "";

  const labels = [
    {
      label: populateData.name + " " + lastname,
      icon: "pi-credit-card",
    },
    {
      label: userData.username,
      icon: "pi-id-card",
    },
    {
      label: userData.email,
      icon: "pi-envelope",
    },
  ];

  useEffect(() => {
    error.map((data) => {
      showErrorToast(data);
    });
  }, [error]);

  return (
    <>
      <div className="flex mb-2 mt-4">
        <Image
          className="mr-3"
          src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          alt="Image"
          width="100"
          preview
        />

        <div className="flex flex-column justify-content-evenly">
          <Button
            label="Change"
            outlined
            size="small"
            icon="pi pi-image"
          ></Button>
          <Button
            label="Remove"
            outlined
            size="small"
            icon="pi pi-trash"
          ></Button>
        </div>
      </div>

      {/* <InfoContainer title={accountTypeName} labels={labels} />; */}

      <h2 className="text-600">{accountTypeName}</h2>

      {formFields.map((field) => (
        <div key={field.key} className="w-20rem mb-3 flex flex-column">
          <label
            style={{
              fontSize: 14,
            }}
            className="mb-2"
          >
            {field.label}
          </label>
          <InputText
            style={{
              border: formData[field.key]?.error && "2px solid red",
            }}
            name={field.key}
            value={formData[field.key]?.value || ""}
            onChange={change}
            onFocus={focus}
            disabled={field.disabled ? field.disabled : isLoading}
          />
        </div>
      ))}

      <Button
        onClick={() => fieldsValidate(formFields)}
        className="w-8rem mt-5"
        label="Kaydet"
        disabled={isLoading}
      />
    </>
  );
}

const formFields = [
  {
    label: "Firma Adı",
    key: "name",
    validate: {
      regex: Validation.NullOrEmpty,
      error: "Parola en az 6 karakter içermeli!",
    },
    input: {
      placeholder: "",
      type: "text",
    },
  },
  // {
  //   label: "Soyisim",
  //   key: "lastname",
  //   validate: {
  //     regex: Validation.NullOrEmpty,
  //     error: "Parola en az 6 karakter içermeli!",
  //   },
  //   input: {
  //     placeholder: "",
  //     type: "text",
  //   },
  // },
  {
    label: "Kullanıcı Adı",
    key: "username",
    validate: {
      regex: Validation.Username,
      error: "Parola en az 6 karakter içermeli!",
    },
    input: {
      placeholder: "",
      type: "text",
    },
  },
  {
    label: "E-Posta",
    key: "email",
    validate: {
      regex: Validation.Email,
      error: "Parola en az 6 karakter içermeli!",
    },
    input: {
      placeholder: "",
      type: "text",
    },
  },
];
