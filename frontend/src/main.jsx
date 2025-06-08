//import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

import logger from "redux-logger";
import rootReducer from "../reducer/rootReducer.jsx";
import AdminAction from "../action/AdminAction.jsx";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
store.dispatch(AdminAction());

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
