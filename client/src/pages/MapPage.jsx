import React, { useEffect, useState, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";

import axios from "axios";

import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapMarker from "../components/MapMarker";
import ErrorBoundary from "../components/ErrorBoundry";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function MapPage() {
  const { matches } = useAuth();

  const turkiyeCitiesAPI = "https://turkiyeapi.dev/api/v1/provinces";

  const capitalCityCoordinates = [39.9334, 32.8597];

  const capitalCityZoom = 5;
  const cityZoom = 8;
  const markZoom = 15;

  const standartMarkIconSettings = L.icon({
    iconUrl: `/assets/icons/wind-power.png`,
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const [customIcon, setCustomIcon] = useState(standartMarkIconSettings);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCentral, setSelectedCentral] = useState(null);

  const [cities, setCities] = useState([]);

  const mapRef = useRef(null);

  const goCoordinates = (coordinates, zoom) => {
    if (mapRef.current) {
      mapRef.current.setView(coordinates, zoom);
    }
  };

  const defaultMapView = () => {
    setSelectedCity(null);
    setSelectedCentral(null);
    goCoordinates(capitalCityCoordinates, capitalCityZoom);
  };

  const clearCity = () => {
    setSelectedCity(null);
    goCoordinates(capitalCityCoordinates, capitalCityZoom);
  };

  const changeMarkerIcon = (iconName) => {
    setCustomIcon(
      L.icon({
        iconUrl: `/assets/icons/${iconName}`,
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
      })
    );
  };

  const findCities = async () => {
    try {
      const response = await axios.get(turkiyeCitiesAPI);
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

  useEffect(() => {
    if (selectedCentral) {
      changeMarkerIcon(selectedCentral.icon);
      clearCity();
    }
  }, [selectedCentral]);

  useEffect(() => {
    if (selectedCity) {
      let latitude = selectedCity.coordinates.latitude;
      let longitude = selectedCity.coordinates.longitude;

      goCoordinates([latitude, longitude], cityZoom);
    }
  }, [selectedCity]);

  useEffect(() => {
    findCities();
  }, []);

  return (
    <div
      style={{
        flexDirection: matches ? "column" : "row",
      }}
      className="flex-1 h-screen overflow-hidden flex"
    >
      <div className="pl-3 pr-3 flex flex-column">
        <h1>Harita</h1>

        <div className="w-20rem mb-5 mt-5 flex align-items-center">
          <Dropdown
            options={centrals}
            value={selectedCentral}
            onChange={(e) => setSelectedCentral(e.value)}
            optionLabel="name"
            placeholder="Santral Seç"
            className="w-full md:w-14rem"
          />

          {selectedCentral && (
            <i
              onClick={defaultMapView}
              className="pi pi-times ml-2 text-blue-400 cursor-pointer"
            />
          )}
        </div>

        <div className="w-20rem mb-5 flex align-items-center">
          <Dropdown
            disabled={cities.length > 0 && selectedCentral ? false : true}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Şehir Seç"
            className="w-full md:w-14rem"
          />

          {selectedCity && (
            <i
              onClick={clearCity}
              className="pi pi-times ml-2 text-blue-400 cursor-pointer"
            />
          )}
        </div>
      </div>

      <MapContainer
        ref={mapRef}
        className="h-full flex-1"
        center={capitalCityCoordinates}
        zoom={5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {selectedCentral
          ? selectedCentral.code === "res"
            ? selectedCity
              ? ResData.map(
                  (item, i) =>
                    item.city === selectedCity.id && (
                      <MapMarker
                        key={i}
                        item={item}
                        icon={customIcon}
                        onClick={() => {
                          goCoordinates(
                            [item.location.lat, item.location.lng],
                            markZoom
                          );
                        }}
                      />
                    )
                )
              : ResData.map((item, i) => (
                  <MapMarker
                    key={i}
                    item={item}
                    icon={customIcon}
                    onClick={() => {
                      goCoordinates(
                        [item.location.lat, item.location.lng],
                        markZoom
                      );
                    }}
                  />
                ))
            : selectedCentral.code === "ges"
            ? selectedCity
              ? GesData.map(
                  (item, i) =>
                    item.city === selectedCity.id && (
                      <MapMarker
                        key={i}
                        item={item}
                        icon={customIcon}
                        onClick={() => {
                          goCoordinates(
                            [item.location.lat, item.location.lng],
                            markZoom
                          );
                        }}
                      />
                    )
                )
              : GesData.map((item, i) => (
                  <MapMarker
                    key={i}
                    item={item}
                    icon={customIcon}
                    onClick={() => {
                      goCoordinates(
                        [item.location.lat, item.location.lng],
                        markZoom
                      );
                    }}
                  />
                ))
            : selectedCentral.code === "ym"
            ? selectedCity
              ? YapayManiaData.map(
                  (item, i) =>
                    item.city === selectedCity.id && (
                      <MapMarker
                        key={i}
                        item={item}
                        icon={customIcon}
                        onClick={() => {
                          goCoordinates(
                            [item.location.lat, item.location.lng],
                            markZoom
                          );
                        }}
                      />
                    )
                )
              : YapayManiaData.map((item, i) => (
                  <MapMarker
                    key={i}
                    item={item}
                    icon={customIcon}
                    onClick={() => {
                      goCoordinates(
                        [item.location.lat, item.location.lng],
                        markZoom
                      );
                    }}
                  />
                ))
            : null
          : null}
      </MapContainer>
    </div>
  );
}

const centrals = [
  {
    name: "RES",
    code: "res",
    icon: "wind-power.png",
  },
  {
    name: "GES",
    code: "ges",
    icon: "solar-energy.png",
  },
  {
    name: "Yapay Mania",
    code: "ym",
    icon: "airport.png",
  },
];

const ResData = [
  {
    name: "RES 1",
    location: { lat: 41.0082, lng: 28.9784 },
    city: 34,
    creation_date: "2024-01-01",
    capacity: "200 MW",
    annual_production: "800 GWh",
    number_of_turbines: 40,
    turbine_model: "Nordex N117/2400",
  },
  {
    name: "RES 2",
    location: { lat: 38.4192, lng: 27.1287 },
    city: 35,
    creation_date: "2024-02-01",
    capacity: "180 MW",
    annual_production: "720 GWh",
    number_of_turbines: 36,
    turbine_model: "Siemens SWT-2.3-108",
  },
  {
    name: "RES 3",
    location: { lat: 39.9334, lng: 32.8597 },
    city: 6,
    creation_date: "2024-03-01",
    capacity: "220 MW",
    annual_production: "880 GWh",
    number_of_turbines: 44,
    turbine_model: "Vestas V112-3.0 MW",
  },
  {
    name: "RES 4",
    location: { lat: 40.7128, lng: 29.9414 },
    city: 16,
    creation_date: "2024-04-01",
    capacity: "150 MW",
    annual_production: "600 GWh",
    number_of_turbines: 30,
    turbine_model: "GE 1.5sle",
  },
  {
    name: "RES 5",
    location: { lat: 37.0662, lng: 27.4254 },
    city: 20,
    creation_date: "2024-05-01",
    capacity: "170 MW",
    annual_production: "680 GWh",
    number_of_turbines: 34,
    turbine_model: "Enercon E-82",
  },
  {
    name: "RES 6",
    location: { lat: 41.0182, lng: 28.964 },
    city: 34,
    creation_date: "2024-06-01",
    capacity: "140 MW",
    annual_production: "560 GWh",
    number_of_turbines: 28,
    turbine_model: "Suzlon S66",
  },
  {
    name: "RES 7",
    location: { lat: 37.874, lng: 30.556 },
    city: 32,
    creation_date: "2024-07-01",
    capacity: "160 MW",
    annual_production: "640 GWh",
    number_of_turbines: 32,
    turbine_model: "Siemens SWT-3.0-132",
  },
  {
    name: "RES 8",
    location: { lat: 38.7325, lng: 27.1212 },
    city: 45,
    creation_date: "2024-08-01",
    capacity: "200 MW",
    annual_production: "800 GWh",
    number_of_turbines: 40,
    turbine_model: "GE 2.5-132",
  },
  {
    name: "RES 9",
    location: { lat: 41.2266, lng: 36.0331 },
    city: 55,
    creation_date: "2024-09-01",
    capacity: "180 MW",
    annual_production: "720 GWh",
    number_of_turbines: 36,
    turbine_model: "Nordex N60/1300",
  },
  {
    name: "RES 10",
    location: { lat: 41.0016, lng: 28.9857 },
    city: 26,
    creation_date: "2024-10-01",
    capacity: "220 MW",
    annual_production: "880 GWh",
    number_of_turbines: 44,
    turbine_model: "Senvion 3.4M140",
  },
];

const GesData = [
  {
    name: "GES 1",
    location: { lat: 41.0082, lng: 28.9784 },
    city: 34,
    creation_date: "2024-01-01",
    capacity: "50 MW",
    annual_production: "200 GWh",
    number_of_panels: 20000,
    panel_model: "Trina Solar TSM-350-DE06",
  },
  {
    name: "GES 2",
    location: { lat: 38.4192, lng: 27.1287 },
    city: 35,
    creation_date: "2024-02-01",
    capacity: "45 MW",
    annual_production: "180 GWh",
    number_of_panels: 18000,
    panel_model: "JA Solar JAM60S30-320",
  },
  {
    name: "GES 3",
    location: { lat: 39.9334, lng: 32.8597 },
    city: 6,
    creation_date: "2024-03-01",
    capacity: "60 MW",
    annual_production: "240 GWh",
    number_of_panels: 24000,
    panel_model: "Canadian Solar CS6K-300M",
  },
  {
    name: "GES 4",
    location: { lat: 40.7128, lng: 29.9414 },
    city: 16,
    creation_date: "2024-04-01",
    capacity: "55 MW",
    annual_production: "220 GWh",
    number_of_panels: 22000,
    panel_model: "LONGi Solar LR6-60HPH",
  },
  {
    name: "GES 5",
    location: { lat: 37.0662, lng: 27.4254 },
    city: 20,
    creation_date: "2024-05-01",
    capacity: "50 MW",
    annual_production: "200 GWh",
    number_of_panels: 20000,
    panel_model: "Hanwha Q CELLS Q.PEAK-G6",
  },
];

const YapayManiaData = [
  {
    name: "YapayMania 1",
    location: { lat: 41.0082, lng: 28.9784 },
    city: 34,
    creation_date: "2024-01-01",
    capacity: "200 MW",
    annual_production: "800 GWh",
    number_of_turbines: 40,
    turbine_model: "Nordex N117/2400",
  },
  {
    name: "YapayMania 2",
    location: { lat: 38.4192, lng: 27.1287 },
    city: 35,
    creation_date: "2024-02-01",
    capacity: "180 MW",
    annual_production: "720 GWh",
    number_of_turbines: 36,
    turbine_model: "Siemens SWT-2.3-108",
  },
  {
    name: "YapayMania 3",
    location: { lat: 39.9334, lng: 32.8597 },
    city: 6,
    creation_date: "2024-03-01",
    capacity: "220 MW",
    annual_production: "880 GWh",
    number_of_turbines: 44,
    turbine_model: "Vestas V112-3.0 MW",
  },
  {
    name: "YapayMania 4",
    location: { lat: 40.7128, lng: 29.9414 },
    city: 16,
    creation_date: "2024-04-01",
    capacity: "150 MW",
    annual_production: "600 GWh",
    number_of_turbines: 30,
    turbine_model: "GE 1.5sle",
  },
  {
    name: "YapayMania 5",
    location: { lat: 37.0662, lng: 27.4254 },
    city: 20,
    creation_date: "2024-05-01",
    capacity: "170 MW",
    annual_production: "680 GWh",
    number_of_turbines: 34,
    turbine_model: "Enercon E-82",
  },
  {
    name: "YapayMania 6",
    location: { lat: 41.0182, lng: 28.964 },
    city: 34,
    creation_date: "2024-06-01",
    capacity: "140 MW",
    annual_production: "560 GWh",
    number_of_turbines: 28,
    turbine_model: "Suzlon S66",
  },
  {
    name: "YapayMania 7",
    location: { lat: 37.874, lng: 30.556 },
    city: 32,
    creation_date: "2024-07-01",
    capacity: "160 MW",
    annual_production: "640 GWh",
    number_of_turbines: 32,
    turbine_model: "Siemens SWT-3.0-132",
  },

  {
    name: "YapayMania 10",
    location: { lat: 41.0016, lng: 28.9857 },
    city: 26,
    creation_date: "2024-10-01",
    capacity: "220 MW",
    annual_production: "880 GWh",
    number_of_turbines: 44,
    turbine_model: "Senvion 3.4M140",
  },
];
