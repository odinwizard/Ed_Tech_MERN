import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Home from "./pages/Home";

import { ForgotPassword } from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";




function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
         <Route
          path="forget-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
         <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
      </Routes>
      
   </div>
  );
}

export default App;
