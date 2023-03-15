
import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Algorithms from "./Algorithms";
import Informations from "./Informations";
import { Routes } from "react-router-dom/dist";
 
class Main extends Component {
  render() {
    return (
      <HashRouter>
      <div>
        <h1>AlgoVisualizer</h1>
        <ul className="header">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/Algorithms">Algorithms</NavLink></li>
        <li><NavLink to="/Informations">Informations</NavLink></li>
        </ul>
        <div className="content">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/Algorithms" element={<Algorithms/>}/>
        <Route path="/Informations" element={<Informations/>}/>
      </Routes>
        </div>
      </div>
    </HashRouter>
    );
  }
}
 
export default Main;