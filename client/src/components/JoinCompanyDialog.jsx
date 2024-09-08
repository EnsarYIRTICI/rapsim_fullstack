import React, { useEffect, useState, useRef } from "react";

import { Steps } from "primereact/steps";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import API from "../config/API";
import axios from "axios";

export default function JoinCompanyDialog({ visible, setVisible }) {
  const [selectedCentral, setSelectedCentral] = useState(null);

  return (
    <Dialog
      draggable={false}
      header="Firmaya Kayıt Ol"
      visible={visible}
      style={{ width: "30rem" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
    >
      <div className="flex flex-column">
        <Dropdown
          value={selectedCentral}
          onChange={(e) => setSelectedCentral(e.value)}
          options={centrals}
          optionLabel="name"
          className="w-15rem"
        />

        <span className="mt-5" />

        <Button label="Başvur" className="w-10rem align-self-end" />
      </div>
    </Dialog>
  );
}

const centrals = [
  {
    name: "Köfteci Yusuf",
    code: "res",
  },
  {
    name: "Mediamarkt",
    code: "ges",
  },
];
