// import { Route, Navigate } from "react-router-dom";
// import { getToken } from "./helpers";

// const PrivateRoute = (props) => {
//   return getToken() ? (
//     <Route {...props} />
//   ) : (
//     <Navigate to="/login" state={{ from: props.path }} replace />
//   );
// };

// export default PrivateRoute;
//-----------------------------------------------------------------------
// import React, { useContext } from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";

// const PrivateWrapper = () => {
//   const { isLoggedIn } = useContext(AuthContext);
  
//   return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateWrapper;
//------------------------------------------------------------------------

// login/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getUser } from './helpers';

const PrivateRoute = (props) => {
  const isAuthenticated = getUser();

  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" state={{ from: props.path }} replace />
  );
};

export default PrivateRoute;

