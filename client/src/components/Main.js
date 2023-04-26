import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import Algorithms from "./Algorithms";
import Informations from "./Informations";
import { Routes } from "react-router-dom/dist";
import CreatePost from "./forum/CreatePost";
import Forum from "./Forum";
import SinglePost from "./forum/SinglePost";
import UpdatePost from "./forum/UpdatePost";
 
class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>AlgoVisualizer</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/Algorithms">Algorithms</NavLink></li>
            <li><NavLink to="/Informations">Informations</NavLink></li>
            <li><NavLink to="/Forum">Forum</NavLink></li>
            <li><NavLink to="/CreatePost">Create post</NavLink></li>
          </ul>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/Algorithms" element={<Algorithms/>}/>
              <Route path="/Informations" element={<Informations/>}/>
              <Route path="/Forum" element={<Forum/>} />
              <Route path="/CreatePost" element={<CreatePost/>} />
              <Route path="/post/:slug" element={<SinglePost/>} />
              <Route path="/post/update/:slug" element={<UpdatePost/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default Main;
