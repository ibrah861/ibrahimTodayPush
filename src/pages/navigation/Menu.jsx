import React, { useContext } from "react";

// import hooks
import { stateManager } from "../../utility/authContext/Context";

const Menu = () => {
  const { setMenuNav } = useContext(stateManager);
  // open nav Menu function
  const openNavMenu = () => {
    setMenuNav(true);
  };
  return (
    <div className="menu-div" onClick={openNavMenu}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Menu;
