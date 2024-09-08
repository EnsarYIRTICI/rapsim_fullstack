import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function AnyPage() {
  const navigation = useNavigate();

  useEffect(() => {
    navigation("/");
  }, []);

  return <Loading />;
}
