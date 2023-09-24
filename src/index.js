import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LoadScript } from "@react-google-maps/api";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_PUBLIC_GOOGLE_MAP_API_KEY}
        >
          <App />
        </LoadScript>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
