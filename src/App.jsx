import { Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";

// ROUTES
import Home from "./pages/Home";
import View from "./pages/View";
import Create from "./pages/Create";
import Navigation from "./pages/navigation/Navigation";
import AdminDashBoard from "./pages/AdminDashBoard";
import Protected from "./pages/protectedRoutes/Protected";
import MenuNav from "./pages/navigation/MenuNav";
import Update from "./pages/Update";
import PostDescription from "./pages/PostDescription";
import { stateManager } from "./utility/authContext/Context";

// CSS
import "./pages/Home.css";
import "./pages/View.css";
import "./pages/Admin.css";
import "./uiComponent/Loader.css";
import "./pages/navigation/Menu.css";
import "./pages/PostDescription.css";

import "./pages/authPages/Auth.css";
import "./pages/index.css";
import "./pages/navigation/Navigation.css";
import "./uiComponent/LogOut.css";

const App = () => {
  const { menuNav } = useContext(stateManager);
  return (
    <>
      {menuNav && <MenuNav />}
      <Navigation />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<Protected />}>
            <Route path="/view" element={<View />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/postDescription/:id" element={<PostDescription />} />
            <Route path="/admin" element={<AdminDashBoard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
