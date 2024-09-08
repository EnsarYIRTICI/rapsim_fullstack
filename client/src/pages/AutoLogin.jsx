import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import Loading from "../components/Loading";
import UserInformationService from "../service/UserInformationService";
import UserService from "../service/UserService";
import CompInfoService from "../service/CompInfoService";
import OrgInfoService from "../service/OrgInfoService";
import Role from "../utils/RoleUtil";

export default function AutoLogin() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const navigateLoginPage = () => {
    navigate("/login");
  };

  const navigateRegisterPreferencePage = () => {
    navigate("/register/type");
  };

  const signInWithToken = async () => {
    const authId = localStorage.getItem("authId");
    const authToken = localStorage.getItem("authToken");

    console.log("AUTH ID", authId);
    console.log("AUTH TOKEN", authToken);

    if (authId && authToken) {
      try {
        const mePopulate = await UserService.MePopulate(authToken);

        console.log("ME POPULATE", mePopulate);

        let userInfo;

        if (mePopulate.role.id === Role.PERSONAL) {
          userInfo = await UserInformationService.FindPopulate(
            authToken,
            authId
          );
        } else if (mePopulate.role.id === Role.COMPANY) {
          userInfo = await CompInfoService.FindPopulate(authToken, authId);
        } else if (mePopulate.role.id === Role.ORGANISATION) {
          userInfo = await OrgInfoService.FindPopulate(authToken, authId);
        } else {
          throw Error("UNSUPPORTED ROLE");
        }

        console.log("USER INFO", userInfo);

        let populateData = userInfo.data[0];
        let userData = populateData.attributes.userId.data;

        userData.attributes.role = mePopulate["role"];

        const customData = {
          jwt: authToken,
          userId: authId,
          user: userData.attributes,
          populateId: populateData.id,
          populate: populateData.attributes,
        };

        login(customData);
      } catch (error) {
        console.log("AUTO LOGIN ERROR:", error);

        navigateLoginPage();
      }
    } else {
      navigateLoginPage();
    }
  };

  useEffect(() => {
    signInWithToken();
  }, []);

  return <Loading />;
}
