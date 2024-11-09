import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { accessToken } = localStorage.getItem("userInfo");
  if (accessToken === undefined) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
