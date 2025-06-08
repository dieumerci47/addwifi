import { GET_ALL_ADMIN } from "../action/AdminAction";

const initialState = {};
export default function AdminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ADMIN:
      return action.payload;
    default:
      return state;
  }
}
