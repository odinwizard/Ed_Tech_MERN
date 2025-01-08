
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
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
       <Toaster/>
    </BrowserRouter> 
  </Provider>
   
  </React.StrictMode>
);
