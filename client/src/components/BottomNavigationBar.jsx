import React, { useEffect, useRef } from "react";

import { Button } from "primereact/button";

import rapsimLogo from "../assets/icons/rapsim-1.png";
import NavigationBarItem from "./NavigationBarItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function BottomNavigationBar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div
      style={{
        borderTop: "1px solid grey",
      }}
      className="w-full h-5rem pl-5 pr-5 flex align-items-center justify-content-between"
    >
      {iconDataGeneral.map((data, i) => (
        <NavigationBarItem key={i} icon={data.icon} location={data.location} />
      ))}
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

  {
    icon: "pi-user",
    location: "account",
  },
];
