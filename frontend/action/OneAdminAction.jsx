// import { URL } from "../src/Tool";

import { supabase } from "../src/supabase/supabase";

export const GET_ONE_ADMIN = "GET_ONE_ADMIN";
// const URL = "https://addwifi.onrender.com";
// const LOCAL = "http://localhost:5000";
export const getOneAdmin = (uuid) => {
  return async (dispatch) => {
    return await supabase
      .from("admins")
      .select("*")
      .eq("_id", uuid)
      .then((res) => {
        dispatch({ type: GET_ONE_ADMIN, payload: res });
      });
    /* fetch(`${URL}/wifi/admin/${uid}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: GET_ONE_ADMIN, payload: res });
      })
      .catch((err) => console.log(err)); */
  };
};
