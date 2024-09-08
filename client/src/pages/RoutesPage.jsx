import React from "react";

import { Route, Routes } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import LoginPage from "../pages/LoginPage";
import RegisterPreferencesPage from "../pages/RegisterPreferencePage";
import RegisterPage from "./RegisterPage";
import PersonalRegisterPage from "../pages/PersonalRegisterPage";
import OrganisationRegisterPage from "../pages/OrganisationRegisterPage";
import CompanyRegisterPage from "../pages/CompanyRegisterPage";
import NavigationBar from "../components/NavigationBar";
import HomePage from "../pages/HomePage";
import InboxPage from "../pages/InboxPage";
import AnyPage from "./AnyPage";
import ForgotPassword from "./ForgotPassword";
import BottomNavigationBar from "../components/BottomNavigationBar";
import CentralPage from "./CentralPage";
import MapPage from "./MapPage";
import AccountPage from "./AccountPage";
import AutoLogin from "./AutoLogin";
import UsersPage from "./UsersPage";

export default function RoutesPage() {
  const { matches, authData } = useAuth();

  return (
    <>
      {authData ? (
        <div
          style={{
            flexDirection: matches ? "column" : "row",
          }}
          className="w-screen h-screen overflow-hidden flex"
        >
          {!matches && <NavigationBar />}

          <Routes>
            <Route path="*" element={<AnyPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/central" element={<CentralPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>

          {matches && <BottomNavigationBar />}
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<AutoLogin />} />
          <Route path="/" element={<AutoLogin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot" element={<ForgotPassword />} />

          {/* <Route path="/register" element={<RegisterPage />} /> */}

          <Route path="/register/type" element={<RegisterPreferencesPage />} />

          <Route
            path="/register/type/personal"
            element={<PersonalRegisterPage />}
          />
          <Route
            path="/register/type/organisation"
            element={<OrganisationRegisterPage />}
          />
          <Route
            path="/register/type/company"
            element={<CompanyRegisterPage />}
          />
        </Routes>
      )}
    </>
  );
}
