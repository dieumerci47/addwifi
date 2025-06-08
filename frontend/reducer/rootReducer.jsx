import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";
import OneAdminReducer from "./OneAdminReducer";

export default combineReducers({ AdminReducer, OneAdminReducer });
