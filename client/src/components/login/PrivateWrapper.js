import { Navigate } from "react-router-dom";
import { getUser } from "./helpers";

const PrivateWrapper = ({ children }) => {
  return getUser() ? children : <Navigate to="/login" replace />;
};

export default PrivateWrapper;
