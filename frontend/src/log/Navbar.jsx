import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UidContext from "../AppContent";
import Logout from "./Logout";
import "./Navbar.css";
import { supabase } from "../supabase/supabase";

const Navbar = () => {
  const uid = useContext(UidContext);
  const useData = useSelector((state) => state.OneAdminReducer);
  console.log(useData);
  const Supa = () => {
    const uuid = "df5e7231-0456-40d2-bfbe-1f818cc5553e";
    supabase
      .from("users")
      .select("*")
      .eq("admin", uuid)
      .then((res) => {
        console.log(res);
        console.log(res.data[0]);
      });
  };
  return (
    <nav>
      {uid ? (
        <ul>
          <li>WiFiManager</li>
          <button onClick={Supa}>Supabase</button>
          <li className="welcome">
            {useData.data
              ? `Bienvenue, ${useData.data[0].nom.toUpperCase()}`
              : null}
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
