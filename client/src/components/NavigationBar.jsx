import React, { useEffect, useRef } from "react";

import { Button } from "primereact/button";

import rapsimLogo from "../assets/icons/rapsim-1.png";
import NavigationBarItem from "./NavigationBarItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavigationBar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const navigateHomePage = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        borderRight: "1px solid grey",
      }}
      className="w-6rem h-full flex flex-column align-items-center"
    >
      <img
        onClick={navigateHomePage}
        className="w-3rem mt-3 mb-3 cursor-pointer"
        src={rapsimLogo}
      />
      <h5 className="text-600">Genel</h5>

      {iconDataGeneral.map((data, i) => (
        <NavigationBarItem key={i} icon={data.icon} location={data.location} />
      ))}

      <h5 className="text-600">Profil</h5>

      {iconDataProfile.map((data, i) =>
        data.location === "exit" ? (
          <NavigationBarItem
            key={i}
            icon={data.icon}
            location={data.location}
            customOnClick={logout}
          />
        ) : (
          <NavigationBarItem
            key={i}
            icon={data.icon}
            location={data.location}
          />
        )
      )}
    </div>
  );
}

const iconDataGeneral = [
  {
    icon: "pi-building-columns",
    location: "",
  },

  {
    icon: "pi-inbox",
    location: "inbox",
  },

  {
    icon: "pi-users",
    location: "users",
  },

  {
    icon: "pi-list",
    location: "central",
  },

  {
    icon: "pi-map",
    location: "map",
  },
];

const iconDataProfile = [
  {
    icon: "pi-user",
    location: "account",
  },
  {
    icon: "pi-sign-out",
    location: "exit",
  },
];
