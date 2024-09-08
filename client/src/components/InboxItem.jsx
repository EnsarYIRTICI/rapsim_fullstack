import React, { useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

import { Avatar } from "primereact/avatar";

export default function InboxItem({
  type,
  name,
  sender,
  creation_date,
  data,
  selectedItem,
  onClick,
}) {
  const { matches } = useAuth();

  const itemClassName =
    selectedItem?.id === data.id
      ? "pl-3 pt-2 pr-2 inbox-item-selected flex flex-column"
      : "pl-3 pt-2 pr-2 inbox-item flex flex-column";

  const divider = (
    <div
      style={{
        height: 1,
      }}
      className="w-full mt-2 surface-300"
    />
  );

  return (
    <div onClick={() => onClick(data)} className={itemClassName}>
      <div className="flex flex-column justify-content-between">
        <div className="flex p-1">
          <Avatar
            image={
              "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            }
            shape="circle"
            size="large"
          />

          <div className="flex flex-column ml-2 ">
            <div
              style={{
                fontSize: 14,
              }}
            >
              {sender}
            </div>

            <div
              style={{
                fontSize: 14,
              }}
            >
              {name}
            </div>
          </div>

          <div
            style={{
              fontSize: 12,
              marginLeft: "auto",
            }}
            className="text-500"
          >
            {creation_date}
          </div>
        </div>

        <img
          style={{
            width: 20,
            height: 20,
            alignSelf: "flex-end",
          }}
          src={
            type === "RES"
              ? "/assets/icons/wind-power.png"
              : type === "GES"
              ? "/assets/icons/solar-energy.png"
              : "/assets/icons/airport.png"
          }
        />
      </div>

      {divider}
    </div>
  );
}
