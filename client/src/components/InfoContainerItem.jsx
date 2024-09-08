import React, { useEffect, useRef } from "react";

export default function InfoContainerItem({ label, icon }) {
  const iconRef = useRef(null);

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.classList.add(icon);
    }
  }, [iconRef.current]);

  return (
    <div className="flex mb-3">
      <i
        ref={iconRef}
        className="pi mr-2 text-600"
        style={{ fontSize: "1.5rem" }}
      />
      <div>{label}</div>
    </div>
  );
}
