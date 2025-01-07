
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import rootReducers from "./reducer";



const store = configureStore({
  reducer:rootReducers,
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
  <BrowserRouter >
       <App />
    </BrowserRouter> 
  </Provider>
   
  </React.StrictMode>
);
