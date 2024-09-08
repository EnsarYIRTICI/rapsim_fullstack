import React from "react";
import { useAuth } from "../contexts/AuthContext";

import { Skeleton } from "primereact/skeleton";

export default function HomePageSkeleton() {
  const { matches } = useAuth();

  return (
    <>
      <div
        style={{
          width: matches ? "100%" : "50%",
        }}
        className="pl-3 flex flex-column"
      >
        <Skeleton className="w-12rem h-3rem mt-4" />

        <div className="flex flex-wrap">
          {companyDataExample.map((data, i) => (
            <div
              style={{
                width: matches ? "100%" : "50%",
              }}
              className="flex flex-column"
            >
              <Skeleton className="w-10rem h-2rem mt-4 mb-4" />

              {data.labels.map((data, i) => (
                <Skeleton className="flex mb-3 w-8rem h-1rem" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pl-3 flex flex-column">
        <Skeleton className="w-12rem h-3rem mt-4 mb-4" />
        <Skeleton className="w-30rem h-5rem" />
      </div>
    </>
  );
}

const companyDataExample = [
  {
    title: "Genel",
    labels: [
      {
        label: "Firma Tam Adı ve Unvanı",
        icon: "pi-credit-card",
      },
      {
        label: "Adres",
        icon: "pi-map-marker",
      },
    ],
  },

  {
    title: "Firma Sorumlusu",
    labels: [
      {
        label: "Ensar Yırtıcı",
        icon: "pi-id-card",
      },
      {
        label: "Görev",
        icon: "pi-flag",
      },
    ],
  },

  {
    title: "İletişim",
    labels: [
      {
        label: "+90 555 555 55 55",
        icon: "pi-phone",
      },
      {
        label: "company@company.com",
        icon: "pi-envelope",
      },
      {
        label: "https://google.com",
        icon: "pi-globe",
      },
    ],
  },
];
