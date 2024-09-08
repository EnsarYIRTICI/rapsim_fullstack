import React from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Avatar } from "primereact/avatar";

export default function UsersPage() {
  const avatarBodyTemplate = (rowData) => {
    return (
      <Avatar
        image={
          "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        }
        shape="circle"
      />
    );
  };

  return (
    <div className="flex-1 h-screen overflow-hidden overflow-y-scroll flex flex-column">
      <div className="pl-3 pr-3 flex flex-column">
        <h1>Üyeler</h1>

        <DataTable value={usersData} tableStyle={{ minWidth: "30rem" }}>
          <Column body={avatarBodyTemplate} header="Avatar"></Column>
          <Column field="name" header="İsim"></Column>
          <Column field="lastname" header="Soy İsim"></Column>
          <Column field="mission" header="Görev"></Column>
        </DataTable>
      </div>
    </div>
  );
}

const usersData = [
  { id: 1, name: "Ensar", lastname: "Yırtıcı", mission: "Developer" },
  { id: 2, name: "Mensur", lastname: "Basan", mission: "Designer" },
];
