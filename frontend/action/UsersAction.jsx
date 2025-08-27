// import { URL } from "../src/Tool";
import { supabase } from "../src/supabase/supabase";

export const GET_ALL_USERS = "GET_ALL_USERS";
// const URL = "https://addwifi.onrender.com";
// const LOCAL = "http://localhost:5000";
export const getAllUsers = (Uid) => async (dispatch) => {
  return await supabase
    .from("users")
    .select("*")
    .eq("admin", Uid)
    /* fetch(`${URL}/wifi/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json()) */
    .then((res) => {
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    })
    .catch((err) => console.log(err));
};
