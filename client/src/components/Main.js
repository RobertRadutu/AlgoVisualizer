import React, { useState, useEffect, useContext, Fragment } from 'react';
import {
  Route,
  Link,
  NavLink,
  BrowserRouter,
  useParams,
  useNavigate,
  useRoutes
} from "react-router-dom";
import Home from "./Home";
import Algorithms from "./Algorithms";
import Informations from "./Informations";
import { Routes } from "react-router-dom/dist";
import CreatePost from "./forum/CreatePost";
import Forum from "./Forum";
import SinglePost from "./forum/SinglePost";
import UpdatePost from "./forum/UpdatePost";
import Login from "./login/Login";
import { logout, getUser } from "./login/helpers";
import "./style.css";
import { AuthContext } from "./AuthContext";
import Signup from './login/Signup';


function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <li className="login-button">
      <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
    </li>
  );
}

function Main() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    logout(() => {
      setIsLoggedIn(false);
    });
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>

      <div>
        <h1>AlgoVisualizer</h1>
        <ul className="header main-menu">
          <ul className="menu-items">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Algorithms">Algorithms</NavLink>
            </li>
            <li>
              <NavLink to="/Informations">Informations</NavLink>
            </li>
            <li>
              <NavLink to="/Forum">Forum</NavLink>
            </li>
            <li>
              <NavLink to="/CreatePost">Create post</NavLink>
            </li>
            <li>
            <NavLink to="/Signup">Sign Up</NavLink>
          </li>
          </ul>

          {!isLoggedIn && (
            <li className="login-button">
              <NavLink to="/Login">Login</NavLink>
            </li>
          )}
          {isLoggedIn && <LogoutButton onLogout={handleLogout} />}

        </ul>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login onLogin={handleLogin} />}/>
            <Route path="/Algorithms" element={<Algorithms />} />
            <Route path="/Informations" element={<Informations />} />
            <Route path="/Forum" element={<Forum />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/post/update/:slug" element={<UpdatePost />} />
          </Routes>
        </div>
      </div>
     
    </BrowserRouter>
  );
}

export default withParams(Main);
