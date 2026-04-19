import { Route, Routes, useLocation } from "react-router-dom";

// ROUTES
import Home from "./pages/Home";
import View from "./pages/View";
import Create from "./pages/Create";
import Navigation from "./pages/navigation/Navigation";
import AdminDashBoard from "./pages/AdminDashBoard";
import Protected from "./pages/protectedRoutes/Protected";

// CSS
import "./pages/Home.css";
import "./pages/View.css";
import "./pages/Admin.css";
import "./uiComponent/Loader.css";

import "./pages/authPages/Auth.css";
import "./pages/index.css";
import "./pages/navigation/Navigation.css";
import "./uiComponent/LogOut.css";

const App = () => {
  return (
    <>
      <Navigation />

      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<Protected />}>
            <Route path="/view/:id" element={<View />} />
            <Route path="/create" element={<Create />} />
            <Route path="/admin/:id" element={<AdminDashBoard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
