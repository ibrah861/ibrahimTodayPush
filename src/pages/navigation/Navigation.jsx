import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";

// import img
import siteLogo from "../../assets/icon/siteLogo.png";

const Navigation = () => {
  const navigate = useNavigate();

  // logout functionconst
  const isLoggedIn = !!localStorage.getItem("token");
  const logOut = () => {
    if (true) {
      navigate("/");
      localStorage.removeItem("token");
    }
  };

  // return user data
  return (
    <>
      <div className="nav">
        <div className="logo-container">
          <img src={siteLogo} alt="logoSite" className="siteLogo" />
          <ul className="break-none">
            <Link to="/">
              <li className="home">Home</li>
            </Link>
          </ul>
        </div>
        <ul className="nav-list break-none">
          {isLoggedIn && (
            <Link to="/create">
              <li className="account">Create</li>
            </Link>
          )}

          {isLoggedIn && (
            <button onClick={logOut} className="bg-boader button">
              Logout
            </button>
          )}
        </ul>
        <div className="menu-tab">
          <Menu />
        </div>
      </div>
    </>
  );
};

export default Navigation;
