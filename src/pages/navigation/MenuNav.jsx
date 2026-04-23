import React, { use } from "react";

// import hooks
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// import components
import { stateManager } from "../../utility/authContext/Context";

const MenuNav = () => {
  // logout function
  const isLoggedIn = !!localStorage.getItem("token");

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
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

          {isLoggedIn && (
            <div>
              <Link to="/create">
                <li>Create</li>
              </Link>

              <Link to="/view">
                <li>View</li>
              </Link>

              <li onClick={logOut}>LogOut</li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MenuNav;
