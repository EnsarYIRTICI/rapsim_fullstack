import React, { useEffect, useState } from "react";

import "../styles/CentralPage.css";

import { TabMenu } from "primereact/tabmenu";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import AddCentralDialog from "../components/AddCentralDialog";
import SetCoordinateDialog from "../components/SetCoordinateDialog";

export default function CentralPage() {
  const [centralTypeIndex, setCentralTypeIndex] = useState(0);
  const [applicationTypeIndex, setApplicationTypeIndex] = useState(0);

  const [selectedRow, setSelectedRow] = useState(null);

  const [isAddCentralDialogVisible, setIsAddCentralDialogVisible] =
    useState(false);

  const [isSetCoordinateDialogVisible, setIsSetCoordinateDialogVisible] =
    useState(false);

  const onCentralTabChange = (e) => {
    setCentralTypeIndex(e.index);
  };

  const onApplicationTabChange = (e) => {
    setApplicationTypeIndex(e.index);
  };

  const onRowClick = (event) => {
    setSelectedRow(event.data);
    console.log("Selected row:", event.data);
  };

  const iconTemplate = (rowData) => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i
          className="pi pi-pencil"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedRow(rowData);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (selectedRow) {
      console.log(selectedRow);
      setIsSetCoordinateDialogVisible(true);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (!isSetCoordinateDialogVisible) {
      setSelectedRow(null);
    }
  }, [isSetCoordinateDialogVisible]);

  return (
    <div className="flex-1 h-screen overflow-y-scroll flex">
      <div className="w-full flex flex-column">
        <h1 className="pl-3">Santraller</h1>

        <div className="pr-3 w-full flex justify-content-between">
          <TabMenu
            className="pl-3 w-18rem"
            model={centralTypes}
            activeIndex={centralTypeIndex}
            onTabChange={onCentralTabChange}
          />

          <Button
            onClick={() => {
              setIsAddCentralDialogVisible(true);
            }}
            className="shadow-none text-sm w-10rem h-3rem"
            label="Santral Ekle"
            icon="pi pi-plus"
          />
        </div>

        {/* <TabMenu
          className="pl-3 w-10rem"
          model={applicationTypes}
          activeIndex={applicationTypeIndex}
          onTabChange={onApplicationTabChange}
        /> */}

        <DataTable
          emptyMessage="Hiç Santral Bulunamadı"
          value={
            exampleCentralData.filter(
              (data) =>
                data["centraltype"] === centralTypes[centralTypeIndex].label
            )
            // .filter(
            //   (data) =>
            //     data["applicationtype"] ===
            //     applicationTypes[applicationTypeIndex].label
            // )
          }
          className="pl-3 pr-3 mt-3"
          tableStyle={{ minWidth: "30rem" }}
        >
          <Column body={iconTemplate} header="Actions" />

          {columns.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              bodyClassName="data-table-cell"
            />
          ))}
        </DataTable>
      </div>

      <AddCentralDialog
        visible={isAddCentralDialogVisible}
        setVisible={setIsAddCentralDialogVisible}
      />

      <SetCoordinateDialog
        visible={isSetCoordinateDialogVisible}
        setVisible={setIsSetCoordinateDialogVisible}
        centralData={selectedRow}
      />
    </div>
  );
}

const centralTypes = [
  { label: "RES" },
  { label: "GES" },
  { label: "Yapay Mania" },
];

const applicationTypes = [{ label: "TEA" }, { label: "DHMI" }];

const columns = [
  { header: "Santral Adı", field: "name" },
  { header: "Santral Türü", field: "centraltype" },
  { header: "Başvuru Türü", field: "applicationtype" },
  { header: "Şehir", field: "city" },
  { header: "İlçe", field: "district" },
  { header: "Mevki", field: "site" },
  { header: "Lisans Sahipliği", field: "licenceownership" },
  { header: "Lisans Tarihi", field: "licencehistory" },
  { header: "Lisans Numarası", field: "licencenumber" },
  { header: "Lisans Gücü", field: "licencepower" },
];

const exampleCentralData = [
  {
    name: "Kofteci Yusuf RES 1",
    centraltype: "RES",
    applicationtype: "DHMI",
    city: "Ankara",
    district: "Çankaya",
    site: "Mevlana Mahallesi",
    licenceownership: "Yusuf Koç",
    licencehistory: "2023-01-15",
    licencenumber: "123456",
    licencepower: "50MW",
    coordinates: [
      [39.9334, 32.8597],
      [39.9335, 32.86],
      [39.9336, 32.8601],
      [39.9337, 32.8602],
    ],
  },
  {
    name: "Günes Enerjisi Santrali 2",
    centraltype: "GES",
    applicationtype: "TEA",
    city: "İstanbul",
    district: "Kadıköy",
    site: "Moda Mahallesi",
    licenceownership: "Ahmet Yılmaz",
    licencehistory: "2022-06-20",
    licencenumber: "789012",
    licencepower: "75MW",
    coordinates: [
      [41.0216, 28.987],
      [41.0217, 28.9872],
      [41.0218, 28.9873],
      [41.0219, 28.9874],
    ],
  },
  {
    name: "Yildiz RES 3",
    centraltype: "RES",
    applicationtype: "TEA",
    city: "İzmir",
    district: "Bornova",
    site: "Evka 3 Mahallesi",
    licenceownership: "Mehmet Demir",
    licencehistory: "2021-11-11",
    licencenumber: "345678",
    licencepower: "100MW",
    coordinates: [
      [38.4192, 27.1287],
      [38.4193, 27.1288],
      [38.4194, 27.129],
      [38.4195, 27.1292],
    ],
  },
  {
    name: "Sahil GES 4",
    centraltype: "GES",
    applicationtype: "DHMI",
    city: "Antalya",
    district: "Muratpaşa",
    site: "Lara Mahallesi",
    licenceownership: "Ayşe Korkmaz",
    licencehistory: "2020-08-05",
    licencenumber: "901234",
    licencepower: "60MW",
    coordinates: [
      [36.8841, 30.7056],
      [36.8842, 30.7057],
      [36.8843, 30.7059],
      [36.8844, 30.706],
    ],
  },
  {
    name: "Kaya RES 5",
    centraltype: "RES",
    applicationtype: "TEA",
    city: "Bursa",
    district: "Osmangazi",
    site: "Çekirge Mahallesi",
    licenceownership: "Fatma Şahin",
    licencehistory: "2022-03-22",
    licencenumber: "567890",
    licencepower: "80MW",
    coordinates: [
      [40.1826, 29.066],
      [40.1827, 29.0661],
      [40.1828, 29.0663],
      [40.1829, 29.0664],
    ],
  },
  {
    name: "Güneş Park GES 6",
    centraltype: "GES",
    applicationtype: "DHMI",
    city: "Adana",
    district: "Seyhan",
    site: "Yurt Mahallesi",
    licenceownership: "Emre Kıvanç",
    licencehistory: "2021-12-10",
    licencenumber: "234567",
    licencepower: "90MW",
    coordinates: [
      [37.0019, 35.3213],
      [37.002, 35.3214],
      [37.0021, 35.3216],
      [37.0022, 35.3217],
    ],
  },
  {
    name: "Gözde RES 7",
    centraltype: "RES",
    applicationtype: "TEA",
    city: "Konya",
    district: "Selçuklu",
    site: "Hacıveyis Mahallesi",
    licenceownership: "Hüseyin Aydın",
    licencehistory: "2023-04-18",
    licencenumber: "345679",
    licencepower: "120MW",
    coordinates: [
      [37.8704, 32.4931],
      [37.8705, 32.4932],
      [37.8706, 32.4934],
      [37.8707, 32.4935],
    ],
  },
  {
    name: "Doğa GES 8",
    centraltype: "GES",
    applicationtype: "DHMI",
    city: "Eskişehir",
    district: "Odunpazarı",
    site: "Tepebaşı Mahallesi",
    licenceownership: "Zeynep Yavuz",
    licencehistory: "2020-09-15",
    licencenumber: "789013",
    licencepower: "70MW",
    coordinates: [
      [39.7767, 30.5206],
      [39.7768, 30.5207],
      [39.7769, 30.5209],
      [39.777, 30.521],
    ],
  },
  {
    name: "Sönmez RES 9",
    centraltype: "RES",
    applicationtype: "TEA",
    city: "Kayseri",
    district: "Kocasinan",
    site: "Hacılar Mahallesi",
    licenceownership: "Ahmet Karaca",
    licencehistory: "2022-07-05",
    licencenumber: "890123",
    licencepower: "110MW",
    coordinates: [
      [38.7226, 35.4877],
      [38.7227, 35.4878],
      [38.7228, 35.488],
      [38.7229, 35.4881],
    ],
  },
  {
    name: "Bahar GES 10",
    centraltype: "GES",
    applicationtype: "DHMI",
    city: "Samsun",
    district: "Atakum",
    site: "Denizevleri Mahallesi",
    licenceownership: "Elif Demir",
    licencehistory: "2021-11-25",
    licencenumber: "901235",
    licencepower: "85MW",
    coordinates: [
      [41.3066, 36.33],
      [41.3067, 36.331],
      [41.3068, 36.332],
      [41.3069, 36.333],
    ],
  },
  {
    name: "Akşam RES 11",
    centraltype: "RES",
    applicationtype: "TEA",
    city: "Trabzon",
    district: "Ortahisar",
    site: "Yomra Mahallesi",
    licenceownership: "Kemal Yalçın",
    licencehistory: "2023-02-17",
    licencenumber: "012345",
    licencepower: "95MW",
    coordinates: [
      [41.004, 39.7211],
      [41.0041, 39.7212],
      [41.0042, 39.7214],
      [41.0043, 39.7215],
    ],
  },
  {
    name: "Aydınlık GES 12",
    centraltype: "GES",
    applicationtype: "DHMI",
    city: "Mersin",
    district: "Mezitli",
    site: "Tarsus Yolu Mahallesi",
    licenceownership: "Ayhan Kaya",
    licencehistory: "2022-05-08",
    licencenumber: "123458",
    licencepower: "77MW",
    coordinates: [
      [36.8121, 34.6459],
      [36.8122, 34.646],
      [36.8123, 34.6462],
      [36.8124, 34.6463],
    ],
  },
  {
    name: "Yüksek RES 13",
    centraltype: "RES",
    applicationtype: "TEA",
    city: "Kocaeli",
    district: "İzmit",
    site: "Kocaelipark Mahallesi",
    licenceownership: "Aylin Şen",
    licencehistory: "2021-10-30",
    licencenumber: "234568",
    licencepower: "115MW",
    coordinates: [
      [40.7631, 29.9187],
      [40.7632, 29.9188],
      [40.7633, 29.919],
      [40.7634, 29.9191],
    ],
  },
  {
    name: "Yeni Güneş GES 14",
    centraltype: "GES",
    applicationtype: "DHMI",
    city: "Tekirdağ",
    district: "Süleymanpaşa",
    site: "Çorlu Mahallesi",
    licenceownership: "Mehmet Alpay",
    licencehistory: "2023-03-12",
    licencenumber: "345680",
    licencepower: "65MW",
    coordinates: [
      [41.1354, 27.0391],
      [41.1355, 27.0392],
      [41.1356, 27.0394],
      [41.1357, 27.0395],
    ],
  },
];
