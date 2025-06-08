import { GET_ONE_ADMIN } from "../action/OneAdminAction";

const initial = {};
export default function OneAdminReducer(state = initial, action) {
  switch (action.type) {
    case GET_ONE_ADMIN:
      return action.payload;
    default:
      return state;
  }
}
