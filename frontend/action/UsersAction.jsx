export const GET_ALL_USERS = "GET_ALL_USERS";
const URL = "https://addwifi.onrender.com";
// const LOCAL = "http://localhost:5000";
export const getAllUsers = () => async (dispatch) => {
  return await fetch(`${URL}/wifi/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_ALL_USERS, payload: res });
    })
    .catch((err) => console.log(err));
};
