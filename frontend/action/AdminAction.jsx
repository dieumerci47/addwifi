export const GET_ALL_ADMIN = "GET_ALL_ADMIN";
const URL = "https://addwifi.onrender.com";
// const LOCAL = "http://localhost:5000";
const AdminAction = () => {
  return async (dispatch) => {
    return await fetch(`${URL}/wifi/admin`, {
      method: "GET",
      //  credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        dispatch({ type: GET_ALL_ADMIN, payload: res });
      })
      .catch((err) => console.log(err));
  };
};

export default AdminAction;
