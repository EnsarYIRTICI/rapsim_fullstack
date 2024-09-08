import React from "react";

import RegisterTypeCard from "../components/RegisterTypeCard";

import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

export default function RegisterPreferencePage() {
  const navigate = useNavigate();

  const backLoginForm = () => {
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex flex-column align-items-center overflow-x-hidden relative">
      <BackButton onClick={backLoginForm} />

      <h1>{pageData.title}</h1>
      <h3 className="text-600">{pageData.subtitle}</h3>

      <div className="flex flex-wrap">
        {cardData.map((data, i) => (
          <RegisterTypeCard
            key={i}
            title={data.title}
            text={data.text}
            icon={data.icon}
            borderColor={data.borderColor}
            navigateName={data.navigateName}
          />
        ))}
      </div>
    </div>
  );
}

const pageData = {
  title: "Kayıt Ol",
  subtitle: "Kayıt Türü Seç",
};

const cardData = [
  {
    id: 1,
    title: "Bireysel Kayıt",
    text: `Bireysel kayıt, tekil kullanıcıların sisteme kayıt olmasını sağlar. Bu kayıt türü, bireysel kullanıcılara yönelik hizmetler sunan ve kişisel bilgilerin yönetimini içeren bir kayıt sürecini kapsar. Bireysel kayıt ile kullanıcılar, kişisel profil oluşturabilir, hizmetlerden faydalanabilir ve sistemin sunduğu özelliklerden yararlanabilirler.`,
    icon: "pi pi-user",
    borderColor: "solid blue",
    navigateName: "personal",
  },
  {
    id: 2,
    title: "Kurumsal Kayıt",
    text: `Kurumsal kayıt, eğitim, hastaneler veya kamu kuruluşları gibi kurumların sisteme kayıt olmasını sağlar. Bu kayıt türü, kurumsal yapıların ihtiyaçlarını karşılamak üzere tasarlanmıştır ve daha geniş bir bilgi seti gerektirir. Kurumsal kayıt ile kurumlar, kendi bünyelerindeki kullanıcıları yönetebilir, kurumsal hizmetlerden faydalanabilir ve sistemin sunduğu özellikleri toplu olarak kullanabilirler.`,
    icon: "pi pi-building-columns",
    borderColor: "solid orange",
    navigateName: "organisation",
  },
  {
    id: 3,
    title: "Firma Kaydı",
    text: `Firma kaydı, ticari işletmelerin ve şirketlerin sisteme kayıt olmasını sağlar. Bu kayıt türü, firma bazında hizmetlerin sunulması ve iş süreçlerinin yönetilmesi amacıyla oluşturulmuştur. Firma kaydı ile şirketler, çalışanlarını yönetebilir, firma hizmetlerinden yararlanabilir ve sistemin sunduğu özellikleri ticari faaliyetleri için kullanabilirler.`,
    icon: "pi pi-building",
    borderColor: "solid red",
    navigateName: "company",
  },
];
