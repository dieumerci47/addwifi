import { URL } from "../src/Tool";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${URL}/wifi/login/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok || data.errors || data.error) {
        let errorMessage = "Erreur de connexion";
        if (data && data.errors) {
          errorMessage = typeof data.errors === "string" ? data.errors : JSON.stringify(data.errors);
        } else if (data && data.error) {
          errorMessage = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        } else if (data && data.message) {
          errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }

      dispatch({ type: LOGIN_SUCCESS, payload: data });
      return data;
    } catch (err) {
      dispatch({ type: LOGIN_FAIL });
      throw err;
    }
  };
};
