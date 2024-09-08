import React, { useEffect, useState } from "react";

import "../styles/InboxPage.css";

import InboxItem from "../components/InboxItem";
import { useAuth } from "../contexts/AuthContext";

import { Menubar } from "primereact/menubar";
import { TabMenu } from "primereact/tabmenu";

import NavigationBarItem from "../components/NavigationBarItem";

import BackButton from "../components/BackButton";

export default function InboxPage() {
  const { matches } = useAuth();

  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { label: "Gönderilen", icon: "pi pi-send" },
    { label: "Gelen", icon: "pi pi-inbox" },
  ];

  const onInboxItemClick = (data) => {
    setSelectedItem(data);
  };

  useEffect(() => {
    setSelectedItem(null);
  }, [activeIndex]);

  return (
    <div className="flex-1 overflow-hidden flex">
      <div className="w-full flex flex-column">
        <h1 className="pl-3">Başvurular</h1>

        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />

        <div className="flex-1 flex relative">
          <div className="overflow-y-scroll list">
            {activeIndex === 0
              ? sendingData.map((data, i) => (
                  <InboxItem
                    key={i}
                    type={data.type}
                    name={data.name}
                    sender={data.sender}
                    creation_date={data.creation_date}
                    data={data}
                    selectedItem={selectedItem}
                    onClick={onInboxItemClick}
                  />
                ))
              : comingData.map((data, i) => (
                  <InboxItem
                    key={i}
                    type={data.type}
                    name={data.name}
                    sender={data.sender}
                    creation_date={data.creation_date}
                    data={data}
                    selectedItem={selectedItem}
                    onClick={onInboxItemClick}
                  />
                ))}
          </div>

          {selectedItem && (
            <div className="flex-1 w-full details">
              <div className="w-full h-full flex align-items-center justify-content-center relative">
                <BackButton
                  className="back"
                  onClick={() => setSelectedItem(null)}
                />
                <h1>Veri Bulunamadı</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const comingData = [
  // {
  //   id: 1,
  //   type: "Firma",
  //   name: "mediamarkt",
  //   sender: "AHMET ENSAR YIRTICI",
  //   creation_date: "1 saat önce",
  // },
];

const sendingData = [
  {
    id: 1,
    type: "GES",
    name: "ges1",
    sender: "AHMET ENSAR YIRTICI",
    creation_date: "1 saat önce",
  },

  {
    id: 2,
    type: "RES",
    name: "res1",
    sender: "AHMET ENSAR YIRTICI",
    creation_date: "2 hatfa önce",
  },
];
