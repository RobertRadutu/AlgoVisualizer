import React from "react";
import ReactDOM from "react-dom";
import Main from './components/Main';
import "./index.css";
import { AuthContext, AuthProvider } from "./components/AuthContext";
 
ReactDOM.render(
  <AuthProvider>
  <Main />
</AuthProvider>,
  document.getElementById("root")
);