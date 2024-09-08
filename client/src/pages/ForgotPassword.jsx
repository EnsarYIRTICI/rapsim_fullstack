import React, { useEffect, useState } from "react";
import loginBackgroundImage from "../assets/images/login_background.jpg";

import { useAuth } from "../contexts/AuthContext";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import BackButton from "../components/BackButton";

export default function ForgotPassword() {
  const { matches } = useAuth();

  const [timeLeft, setTimeLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const [emailValue, setEmailValue] = useState("");

  const navigate = useNavigate();

  const backLoginForm = () => {
    navigate("/login");
  };

  const startCountdown = () => {
    setTimeLeft(5);
    setIsCounting(true);
  };

  useEffect(() => {
    let intervalId;

    if (isCounting && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isCounting) {
      setIsCounting(false);
    }

    return () => clearInterval(intervalId);
  }, [isCounting, timeLeft]);

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

      <div
        style={{
          width: matches ? "100%" : "50%",
        }}
        className="h-full overflow-y-scroll flex flex-column align-items-center justify-content-center relative"
      >
        <BackButton onClick={backLoginForm} />

        <h1 className="align-self-center">Şifremi Unuttum</h1>

        <div className="w-25rem mb-3 flex flex-column">
          <label className="mb-2">E-Posta</label>
          <InputText
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            type="password"
            disabled={isCounting}
          />
        </div>

        <Button
          onClick={startCountdown}
          className="w-25rem mb-6"
          label="Gönder"
          disabled={isCounting || emailValue.length < 1 ? true : false}
        />

        {isCounting && <div className="text-500">{timeLeft}</div>}
      </div>
    </div>
  );
}
