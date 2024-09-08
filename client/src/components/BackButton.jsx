import React, { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useAuth } from "../contexts/AuthContext";

export default function BackButton({ className, onClick }) {
  const { matches } = useAuth();

  const buttonRef = useRef(null);

  useEffect(() => {
    if (className) {
      buttonRef.current.classList.add(className);
    }
  }, []);

  return (
    <Button
      ref={buttonRef}
      style={{
        top: matches ? 10 : 30,
        left: matches ? 5 : 30,
      }}
      onClick={onClick}
      className="shadow-none absolute"
      label="Geri Dön"
      icon="pi pi-chevron-left"
      rounded
      text
    />
  );
}
