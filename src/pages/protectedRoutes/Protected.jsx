import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const valiedToken = localStorage.getItem("token");

  if (valiedToken === "") {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
};

export default Protected;
