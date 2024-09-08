import React, { useEffect, useState, useRef } from "react";

import { Steps } from "primereact/steps";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import { MapContainer, TileLayer, Rectangle } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import API from "../config/API";
import axios from "axios";

export default function AddCentralDialog({ visible, setVisible }) {
  const stepsCount = 3;

  const [activeIndex, setActiveIndex] = useState(0);
  const [cities, setCities] = useState(null);
  const [districts, setDistricts] = useState(null);

  const [formData, setFormData] = useState({
    coordinate1: 39.9208,
    coordinate2: 32.8541,
    coordinate3: 39.9334,
    coordinate4: 32.8597,
  });

  const formFields = [
    {
      label: "Santral Adı",
      key: "name",
      activeIndex: 0,
      input: {
        placeholder: "kofteciyusufres1",
      },
    },

    {
      label: "Santral Türü",
      key: "centraltype",
      activeIndex: 0,
      dropdown: {
        options: centrals,
      },
    },

    {
      label: "Başvuru Türü",
      key: "applicationtype",
      activeIndex: 0,
      dropdown: {
        options: applications,
      },
    },

    {
      label: "Şehir",
      key: "city",
      activeIndex: 1,
      dropdown: {
        options: cities,
      },
    },

    {
      label: "İlçe",
      key: "district",
      activeIndex: 1,
      dropdown: {
        options: districts,
      },
    },

    {
      label: "Mevki",
      key: "site",
      activeIndex: 1,
      input: {
        placeholder: "Mahalle",
      },
    },

    {
      label: "Lisans Sahipliği",
      key: "licenceownership",
      activeIndex: 2,
      input: {
        placeholder: "",
      },
    },

    {
      label: "Lisans Tarihi",
      key: "licencehistory",
      activeIndex: 2,
      input: {
        placeholder: "",
      },
    },

    {
      label: "Lisans Numarası",
      key: "licencenumber",
      activeIndex: 2,
      input: {
        placeholder: "",
      },
    },

    {
      label: "Lisans Gücü",
      key: "licencepower",
      activeIndex: 2,
      input: {
        placeholder: "",
      },
    },

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

  const findCities = async () => {
    try {
      const response = await axios.get(API.API_TURKIYE_CITIES);
      const jsonData = await response.data.data;

      let customCities = [];

      jsonData.map((data) => {
        data["code"] = data.id;
        customCities.push(data);
      });

      setCities(customCities);
    } catch (error) {
      console.log(error);
    }
  };

  const before = () => {
    setActiveIndex((s) => {
      if (s > 0) return s - 1;
      else return 0;
    });
  };

  const after = () => {
    setActiveIndex((s) => {
      if (s < 3) return s + 1;
      else return 2;
    });
  };

  const confirm = () => {};

  useEffect(() => {
    findCities();
  }, []);

  useEffect(() => {
    if (formData["city"]) {
      setDistricts(formData["city"].districts);
    }
  }, [formData]);

  return (
    <Dialog
      className="add-central-dialog"
      draggable={false}
      header="Santral Ekle"
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="flex flex-column">
        <Steps
          className="w-full mb-5 mt-3"
          model={stepsItems}
          activeIndex={activeIndex}
        />

        <div className="flex flex-wrap justify-content-between">
          {formFields.map(
            (field) =>
              field.activeIndex === activeIndex &&
              (field.dropdown ? (
                <div key={field.key} className="w-15rem mb-3 flex flex-column">
                  <label className="mb-2">{field.label}</label>
                  <Dropdown
                    value={formData[field.key]}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: e.value,
                      }));
                    }}
                    options={field.dropdown.options}
                    optionLabel="name"
                    className="w-15rem"
                    disabled={field.dropdown.options ? false : true}
                  />
                </div>
              ) : (
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
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }));
                    }}
                    className="w-full"
                    placeholder={field.input.placeholder}
                    type={field.input.type || "text"}
                  />
                </div>
              ))
          )}
        </div>
        {/* 
        {activeIndex === stepsCount - 1 && (
          <MapContainer
            center={[formData["coordinate1"], formData["coordinate2"]]}
            zoom={13}
            style={{ height: "10rem", width: "100%" }}
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
        )} */}

        <span className="mt-5" />

        {activeIndex === 0 ? (
          <div className="w-full flex justify-content-end">
            <Button label="Sonraki" onClick={after} />
          </div>
        ) : activeIndex < stepsCount - 1 ? (
          <div className="w-full flex justify-content-between">
            <Button label="Önceki" onClick={before} />
            <Button label="Sonraki" onClick={after} />
          </div>
        ) : (
          <div className="w-full flex justify-content-between">
            <Button label="Önceki" onClick={before} />
            <Button label="Onayla" onClick={confirm} className="bg-teal-400" />
          </div>
        )}
      </div>
    </Dialog>
  );
}

const stepsItems = [
  {
    label: "Tür",
  },
  {
    label: "Lokasyon",
  },
  {
    label: "Lisans",
  },
  // {
  //   label: "Koordinat",
  // },
];

const centrals = [
  {
    name: "RES",
    code: "res",
  },
  {
    name: "GES",
    code: "ges",
  },
  {
    name: "Yapay Mania",
    code: "ym",
  },
];

const applications = [
  {
    name: "TEA",
    code: "tea",
  },
  {
    name: "DHMI",
    code: "dhmi",
  },
];
