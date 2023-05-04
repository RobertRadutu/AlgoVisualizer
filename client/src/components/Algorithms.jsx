import React, { Component } from "react";
import Grid from "./grid/PathfindingVisualizer";
import {useState, useEffect} from "react";
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
  }

  const handleMenuTwo = () => {
    setAlgorithm("A*");
    setOpen(false);
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
      <Grid algorithm = {algorithm} object = {object}></Grid>
    </div>
  );
};


export class Algorithms extends Component {
  constructor(props){  
    super(props);  
    this.state = {
      object:"wall"
    }
  }

  render() {
    return (
      <div className="bodyAlgorithm">
        <button onClick={() => this.setState({ object :"wall" })}> Add Wall </button>
        <button onClick={() => this.setState({ object: "stop" })}> Add Stop </button>
        <DropDown className="meniu" object = {this.state.object}></DropDown>
      </div>
    );
  }
}

export default Algorithms;