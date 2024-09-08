import React, { useEffect, useState } from "react";
import Validation from "../utils/Validation";

export default function useForm(props) {
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({});

  const clear = () => {
    setFormData({});
  };

  const change = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        error: false,
      },
    }));
  };

  const focus = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        value: value,
        error: false,
      },
    }));
  };

  const setValidate = (key, regex, error) => {
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

      setError((prev) => [...prev, error]);

      return true;
    }

    return false;
  };

  const fieldsValidate = (formFields) => {
    setError([]);

    let successfull = true;

    formFields.map((field) => {
      console.log(field);
      if (field.validate) {
        if (
          setValidate(field.key, field.validate.regex, field.validate.error)
        ) {
          successfull = false;
        }
      }
    });

    console.log(successfull);

    return successfull;
  };

  useEffect(() => {
    if (props) {
      setFormData(props);
    }
  }, []);

  return { formData, error, clear, change, focus, setValidate, fieldsValidate };
}
