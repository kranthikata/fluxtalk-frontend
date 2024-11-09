import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  if (loggedInUser === null) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
