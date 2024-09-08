import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function HalfImage({ image }) {
  const { matches } = useAuth();

  const layout = !matches ? (
    <div className="w-6 h-full">
      <img className="w-full h-full object-fit-cover" src={image} />
    </div>
  ) : null;

  return layout;
}
