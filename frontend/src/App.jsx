import "./App.css";
import UidContext from "./AppContent";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOneAdmin } from "../action/OneAdminAction";
import Routes from "./routes/routes";
import { URL } from "./Tool";

function App() {
  // const URL = "https://addwifi.onrender.com";
  // const LOCAL = "http://localhost:5000";
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const FetchData = async () => {
      await fetch(`${URL}/jwtid`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUid(data);
          // setUid("68439cd6bd7aa52609882df3");
        })
        .catch((err) => console.log(err));
    };
    FetchData();
    // setUid("68439cd6bd7aa52609882df3");
    if (uid) dispatch(getOneAdmin(uid));
  }, [uid]);
  return (
    <>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </>
  );
}

export default App;
