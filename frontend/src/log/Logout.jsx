import cookie from "js-cookie";
import { NavLink } from "react-router-dom";
const Logout = () => {
  //const URL = "https://addwifi.onrender.com";
  const LOCAL = "http://localhost:5000";
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const logout = async () => {
    await fetch(`${LOCAL}/wifi/login/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => removeCookie("jwt"))
      //.then((res) => res.json())
      .catch((err) => console.log(err));
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
