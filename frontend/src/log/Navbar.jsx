import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UidContext from "../AppContent";
import Logout from "./Logout";
const Navbar = () => {
  const uid = useContext(UidContext);
  const useData = useSelector((state) => state.OneAdminReducer);
  return (
    <nav>
      {uid ? (
        <ul>
          <li>WIFI</li>
          <li className="welcome">
            <NavLink to="">
              {useData.nom ? `bienvenue ${useData.nom}` : null}
            </NavLink>
          </li>
          {<Logout />}
        </ul>
      ) : (
        <ul>
          <li>WIFI</li>
          <li>
            <NavLink to="/home">
              {/* {
                <img
                  src="https://www.svgrepo.com/show/71656/wifi-sign.svg"
                  alt="login"
                  style={{ width: "20px", height: "20px" }}
                />
              } */}
              <h3>Login</h3>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
