import React, { useEffect, useRef, useState } from "react";

import "../styles/HomePage.css";

import NavigationBar from "../components/NavigationBar";
import InfoContainer from "../components/InfoContainer";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Button } from "primereact/button";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import HomePageSkeleton from "../components/HomePageSkeleton";
import JoinCompanyDialog from "../components/JoinCompanyDialog";

import { Chart } from "primereact/chart";

import trWorldMap from "../assets/images/tr-harita.jpg";

import DoughnutChartDemo from "../components/DoughnutChartDemo";
import StackedBarDemo from "../components/StackedBarDemo";

export default function HomePage() {
  const { matches } = useAuth();

  const [companyData, setCompanyData] = useState([]);

  const [isJoinCompanyDialogVisible, setIsJoinCompanyDialogVisible] =
    useState(false);

  return (
    <div className="flex-1 h-screen overflow-hidden overflow-y-scroll flex flex-column">
      {companyData ? (
        <>
          <h1 className="pl-3">Ana Sayfa</h1>

          <div className="pl-3 pr-3 flex flex-wrap justify-content-center">
            <div className="number-container-list">
              {numbersData.map((data, i) => (
                <div key={i} className="number-container">
                  <h2>{data.title}</h2>
                  <h1>{data.value}</h1>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap">
              <div className="bar-container">
                <h2>Santral Getirisi</h2>

                <StackedBarDemo />
              </div>

              <div className="pie-container">
                <h2>Santral Miktarı</h2>

                <DoughnutChartDemo />
              </div>

              <div className="map-container">
                <h2>Santral Dağlımı</h2>

                <img className="w-15rem" src={trWorldMap} />

                {cityData.map((item, index) => (
                  <div className="map-container-data" key={index}>
                    <div>{item.city}</div>
                    <div>{item.percentage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex flex-column align-items-center justify-content-center">
          <i style={{ fontSize: "5rem" }} className="pi pi-building-columns" />
          <h3 className="text-700">Hiç bir firmaya kayıtlı değilsin</h3>
          <h4 className="text-700 m-0">
            RES ve Yapay Mania Başvuruları için bir Firmaya Kayıt Ol
          </h4>

          <Button
            onClick={() => setIsJoinCompanyDialogVisible(true)}
            className="w-10rem mt-5 shadow-none text-sm"
            label="Firmaya Kayıt Ol"
          />
        </div>
      )}

      {!companyData && (
        <JoinCompanyDialog
          visible={isJoinCompanyDialogVisible}
          setVisible={setIsJoinCompanyDialogVisible}
        />
      )}
    </div>
  );
}

const numbersData = [
  { title: "Toplam Kazanç", value: "125.573$", id: 1 },
  { title: "Toplam Santral", value: "768", id: 2 },
  { title: "Toplam Sürüm Başvurusu", value: "1275", id: 3 },
  { title: "Firma Kullanıcı Sayısı", value: "125", id: 4 },
];

const cityData = [
  { city: "Ankara", percentage: "60%" },
  { city: "Konya", percentage: "20%" },
  { city: "Mersin", percentage: "15%" },
  { city: "Adana", percentage: "5%" },
];
