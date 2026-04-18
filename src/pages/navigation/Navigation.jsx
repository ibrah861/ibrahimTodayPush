import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../utility/axios/AxiosApi";
import { maneger } from "../../utility/authContext/Context";

// import img
import siteLogo from "../../assets/icon/siteLogo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const { setLogout } = useContext(maneger);

  // logout function
  const logOut = () => {
    localStorage.setItem("token", null);
    const isAuther = localStorage.getItem("token");
    if (isAuther !== null) {
      navigate("/");
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
          <Link>
            <li className="account">Account</li>
          </Link>
          <button onClick={logOut} className="bg-boader button">
            Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
