import React, { useRef, useState } from "react";

import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import { useNavigate } from "react-router-dom";

import BackButton from "./BackButton";

export default function RegisterForm({
  inputData,
  setInputData,
  stepsItems,
  stepsCount,
  formName,
  formFields,
  confirm,
  isLoading,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  const fieldsValidate = () => {
    let successfull = true;

    formFields
      .filter((field) => field.activeIndex === activeIndex)
      .map((field) => {
        console.log(field);
        if (field.validate) {
          if (field.validate()) successfull = false;
        }
      });

    return successfull;
  };

  const before = () => {
    setActiveIndex((s) => {
      if (s > 0) return s - 1;
      else return 0;
    });
  };

  const after = () => {
    if (fieldsValidate()) {
      setActiveIndex((s) => {
        if (s < 3) return s + 1;
        else return 2;
      });
    }
  };

  const validateConfirm = () => {
    if (fieldsValidate()) {
      confirm();
    }
  };

  const backRegisterForm = () => {
    navigate("/register/type");
  };

  const onDropDownChange = (e) => {
    const { name, value } = e;
    setInputData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        error: false,
      },
    }));
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        error: false,
      },
    }));
  };

  const onInputFocus = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        error: false,
      },
    }));
  };

  return (
    <div className="register-forms">
      <BackButton onClick={backRegisterForm} disabled={isLoading} />

      <div className="flex flex-column align-items-center">
        <h1>{formName ?? "Form"}</h1>

        <Steps
          className="w-25rem mb-5 mt-3"
          model={stepsItems}
          activeIndex={activeIndex}
        />

        {formFields.map(
          (field, i) =>
            activeIndex === field.activeIndex &&
            (field.dropdown ? (
              <div key={field.key} className="flex flex-column mb-3">
                <label className="mb-2">{field.label}</label>
                <Dropdown
                  name={field.key}
                  value={inputData[field.key]?.value}
                  onChange={onDropDownChange}
                  optionLabel="name"
                  className="mb-1 w-25rem"
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div key={field.key} className="flex flex-column mb-3">
                <label className="mb-2">{field.label}</label>
                <InputText
                  name={field.key}
                  value={inputData[field.key]?.value}
                  style={{
                    border: inputData[field.key]?.error && "2px solid red",
                  }}
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  maxLength={field.input.maxLength ?? undefined}
                  className="mb-1 w-25rem"
                  type={field.input.type}
                  placeholder={field.input.placeholder}
                  disabled={isLoading}
                />
              </div>
            ))
        )}

        {activeIndex === 0 ? (
          <div className="w-25rem flex justify-content-end">
            <Button label="Sonraki" onClick={after} disabled={isLoading} />
          </div>
        ) : activeIndex < stepsCount - 1 ? (
          <div className="w-25rem flex justify-content-between">
            <Button label="Önceki" onClick={before} disabled={isLoading} />
            <Button label="Sonraki" onClick={after} disabled={isLoading} />
          </div>
        ) : (
          <div className="w-25rem flex justify-content-between">
            <Button label="Önceki" onClick={before} disabled={isLoading} />
            <Button
              label="Kayıt Ol"
              onClick={validateConfirm}
              className="bg-teal-400"
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
