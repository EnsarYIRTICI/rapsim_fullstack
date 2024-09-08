import React, { useState } from "react";

import { Steps } from "primereact/steps";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import {
  MapContainer,
  TileLayer,
  Rectangle,
  Polygon,
  Polyline,
} from "react-leaflet";

export default function SetCoordinateDialog({
  visible,
  setVisible,
  centralData,
}) {
  const [formData, setFormData] = useState({
    coordinate1: 39.9208,
    coordinate2: 32.8541,
    coordinate3: 39.9334,
    coordinate4: 32.8597,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formFields = [
    {
      label: "Kooridant 1",
      key: "coordinate1",
      activeIndex: 3,
      input: {
        placeholder: "",
        type: "number",
      },
    },

    {
      label: "Kooridant 2",
      key: "coordinate2",
      activeIndex: 3,
      input: {
        placeholder: "",
        type: "number",
      },
    },

    {
      label: "Kooridant 3",
      key: "coordinate3",
      activeIndex: 3,
      input: {
        placeholder: "",
        type: "number",
      },
    },

    {
      label: "Kooridant 4",
      key: "coordinate4",
      activeIndex: 3,
      input: {
        placeholder: "",
        type: "number",
      },
    },
  ];

  return (
    <Dialog
      className="add-central-dialog"
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(null);
      }}
      header="Koordinat Ekle"
      draggable={false}
    >
      <div className="flex flex-wrap justify-content-between">
        {formFields.map((field) => (
          <div
            key={field.key}
            className={
              field.input.type === "number"
                ? "w-10rem mb-3 flex flex-column"
                : "w-15rem mb-3 flex flex-column"
            }
          >
            <label className="mb-2">{field.label}</label>
            <InputText
              value={formData[field.key]}
              name={field.key}
              onChange={onInputChange}
              className="w-full"
              placeholder={field.input.placeholder}
              type={field.input.type || "text"}
            />
          </div>
        ))}
      </div>

      <MapContainer
        center={[formData["coordinate1"], formData["coordinate2"]]}
        zoom={13}
        style={{ height: "15rem", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Rectangle
          bounds={[
            [formData["coordinate1"], formData["coordinate2"]],
            [formData["coordinate3"], formData["coordinate4"]],
          ]}
        />
      </MapContainer>
    </Dialog>
  );
}
