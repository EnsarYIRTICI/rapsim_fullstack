import React, { useEffect, useRef } from "react";

import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavigationBarItem({ icon, location, customOnClick }) {
  let currentLocation = useLocation();
  const navigate = useNavigate();

  const iconRef = useRef(null);

  const onClick = () => {
    if (customOnClick) {
      customOnClick();
    } else {
      navigate(location);
    }
  };

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.classList.add(icon);

      let pathname = currentLocation.pathname;
      let params = pathname.split("/");

      if (params[1] === location) {
        iconRef.current.classList.add("text-blue-400");
      } else {
        iconRef.current.classList.remove("text-blue-400");
      }
    }
  }, [iconRef.current, currentLocation]);

  return (
    <div className="mb-2 mt-2">
      <i
        onClick={onClick}
        ref={iconRef}
        className="pi cursor-pointer hover:text-blue-400"
        style={{ fontSize: "1.5rem" }}
      />
    </div>
  );
}
