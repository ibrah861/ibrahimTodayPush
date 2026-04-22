import React, { use } from "react";

// import hooks
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// import components
import { stateManager } from "../../utility/authContext/Context";

const MenuNav = () => {
  // logout function
  const logOut = () => {
    localStorage.setItem("token", "");
    const isAuther = localStorage.getItem("token");
    if (isAuther === "" || isAuther === null) {
      navigate("/");
    }
  };

  const { setMenuNav } = useContext(stateManager);
  const navigate = useNavigate();

  // closeNavMenu
  const closeNavMenu = () => {
    setMenuNav(false);
  };
  return (
    <div className="menu-nav">
      <div className="close-nav-Menu">
        <span onClick={closeNavMenu}>&times;</span>
      </div>
      <p> NAVIGATION MENU</p>

      <nav className="menu-ul">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/create">
            <li>Create</li>
          </Link>

          <Link to="/view">
            <li>View</li>
          </Link>

          <Link>
            <li>Update</li>
          </Link>

          <li onClick={logOut}>LogOut</li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuNav;
