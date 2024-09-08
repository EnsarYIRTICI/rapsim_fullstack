import React from "react";

import logo from "../assets/animation/wide-power-plant.json";

import Lottie from "react-lottie-player";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex align-items-center justify-content-center">
      <Lottie
        loop
        animationData={logo}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}
