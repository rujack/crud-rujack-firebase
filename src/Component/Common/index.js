import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";

const ProtectedComponent = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData === null) {
    const data = "null";
    if (data !== null) {
      return <Redirect to="/login" component={Login} />;
    } else {
      return <Redirect to="/" component={Dashboard} />;
    }
  } else {
    const data = userData.uid;
    if (data === null) {
      return <Redirect to="/login" component={Login} />;
    } else {
      return <Redirect to="/" component={Dashboard} />;
    }
  }
};

export default ProtectedComponent;
