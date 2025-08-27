import { NavLink } from "react-router-dom";
import { supabase } from "../supabase/supabase";
const Logout = () => {
  // const URL = "https://addwifi.onrender.com";
  // const LOCAL = "http://localhost:5000";

  const logout = async () => {
    /* await fetch(`${URL}/wifi/login/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => removeCookie("jwt"))
      //.then((res) => res.json())
      .catch((err) => console.log(err)); */
    await supabase.auth.signOut();
    window.location = "/";
  };
  return (
    <>
      <li onClick={logout}>
        <NavLink to="" className="nav-login-btn">
          Logout
        </NavLink>
        {/* <h3>Logout</h3> */}
      </li>
    </>
  );
};

export default Logout;
