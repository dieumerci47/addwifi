import { GET_ALL_USERS } from "../action/UsersAction";

const initial = {};
export default function UsersReducer(state = initial, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
}
