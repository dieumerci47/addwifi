import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneAdmin } from "../action/OneAdminAction";
import Routes from "./routes/routes";
import { SET_AUTHENTICATED } from "../action/AuthAction";
import { URL } from "./Tool";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${URL}/jwtid`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data) {
          dispatch({ type: SET_AUTHENTICATED, payload: data });
        }
      } catch (err) {
        console.log("No active session");
      }
    };
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getOneAdmin(user.id));
    }
  }, [user, dispatch]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
