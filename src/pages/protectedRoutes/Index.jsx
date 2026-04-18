import { useContext } from "react";

// import authentication state
import { Outlet, Navigate, replace } from "react-router-dom";

export const Index = () => {
  return <Outlet />;
};
