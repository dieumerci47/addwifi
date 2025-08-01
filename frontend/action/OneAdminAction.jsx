import { URL } from "../src/Tool";

export const GET_ONE_ADMIN = "GET_ONE_ADMIN";
// const URL = "https://addwifi.onrender.com";
// const LOCAL = "http://localhost:5000";
export const getOneAdmin = (uid) => {
  return async (dispatch) => {
    return await fetch(`${URL}/wifi/admin/${uid}`, {
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
      .catch((err) => console.log(err));
  };
};
