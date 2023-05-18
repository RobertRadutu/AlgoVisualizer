import React, { Component } from "react";

import Grid from "./grid/PathfindingVisualizer";
import {useState, useEffect} from "react";

let algo = "";

const DropDown = ({className, object}) => {
  const [open, setOpen] = React.useState(false);
  const [algrithm, setAlgorithm] = React.useState("")

  const handleOpen = () => {
    setAlgorithm("");
    setOpen(!open);
  }

  const handleMenuOne = () => {
    setAlgorithm("Dijkstra");
    setOpen(false);
    algo = "Dijkstra";
  }

  const handleMenuTwo = () => {
    setAlgorithm("A*");
    setOpen(false);
    algo = "A*";
  }

  return (
    <div>
       <Dropdown
          open={open}
          algorithm={algrithm}
          trigger={<button onClick={handleOpen}>Choose the algorithm you want to visualize</button>}
          menu={[
            <button onClick={handleMenuOne}>Dijkstra</button>,
            <button onClick={handleMenuTwo}>A*</button>,
          ]}
          object={object}
       />
    </div>
  );
};

const Dropdown = ({ open, algorithm, trigger, menu, object }) => {
  return (
    <div className="dropdown">
      {trigger}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">{menuItem}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};


export class Algorithms extends Component {
  constructor(props){  
    super(props);  
    this.state = {
      object:"wall",
      pressed: false,
    }
  }

  getStateOfObstacle(){
    return this.state.object;
  }

  render() {
    return (
      <div className="bodyAlgorithm" data-testid = "custom">
        <button onClick={() => this.setState({ object :"wall" })}> Add Wall </button>
        <button onClick={() => this.setState({ object: "stop" })}> Add Stop </button>
        <button onClick={() => this.setState({ pressed: true })}> Start </button>
        <DropDown className="meniu" object = {this.state.object}></DropDown>
        <Grid algorithm = {algo} object = {this.state.object} pressed = {this.state.pressed}></Grid>
      </div>
    );
  }
}

export default Algorithms;