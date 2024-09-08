import React, { useEffect, useRef } from "react";

import InfoContainerItem from "./InfoContainerItem";
import { useAuth } from "../contexts/AuthContext";

export default function InfoContainer({ title, labels }) {
  const { matches } = useAuth();

  return (
    <div
      style={{
        width: matches ? "100%" : "50%",
      }}
      className="flex flex-column"
    >
      <h3 className="text-700">{title}</h3>
      {labels.map((data, i) => (
        <InfoContainerItem key={i} label={data.label} icon={data.icon} />
      ))}
    </div>
  );
}
