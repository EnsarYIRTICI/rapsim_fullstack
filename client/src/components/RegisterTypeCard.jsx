import React from "react";

import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

export default function RegisterCardCard({
  title,
  text,
  icon,
  borderColor,
  navigateName,
}) {
  const navigate = useNavigate();

  const navigateRegisterFormPage = () => {
    navigate("/register/type/" + navigateName);
  };

  return (
    <Card
      onClick={navigateRegisterFormPage}
      className="w-27rem m-5 border-1 hover:shadow-5 cursor-pointer"
      style={{
        border: borderColor,
        userSelect: "none",
        transition: "250ms",
      }}
    >
      <div className="flex align-items-center mb-3">
        <i
          className={icon}
          style={{ fontSize: "1.5rem", marginRight: "1rem" }}
        />
        <label className="text-xl">{title}</label>
      </div>

      <p className="m-0">{text}</p>
    </Card>
  );
}
