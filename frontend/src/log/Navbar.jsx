import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UidContext from "../AppContent";
import Logout from "./Logout";
import "./Navbar.css";

const Navbar = () => {
  const uid = useContext(UidContext);
  const useData = useSelector((state) => state.OneAdminReducer);
  return (
    <nav>
      {uid ? (
        <ul>
          <li>WiFiManager</li>
          <li className="welcome">
            {useData.nom ? `Bienvenue, ${useData.nom.toUpperCase()}` : null}
          </li>

          <Logout />
        </ul>
      ) : (
        <ul>
          <li>WiFiManager</li>
          {useData.nom ? (
            <NavLink to="/home" className="nav-login-btn">
              Login
            </NavLink>
          ) : null}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
