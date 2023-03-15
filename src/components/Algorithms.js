import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import { Routes } from "react-router-dom/dist";
import Grid from "./grid/grid";
 
const DropDown = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    setOpen(false);
  }

  const handleMenuTwo = () => {
    setOpen(false);
  }

  return (
    <Dropdown
      open={open}
      trigger={<button onClick={handleOpen}>Choose the algorithm you want to visualize</button>}
      menu={[
        <button onClick={handleMenuOne}>Dijkstra</button>,
        <button onClick={handleMenuTwo}>A*</button>,
      ]}
    />
  );
};

const Dropdown = ({ open, trigger, menu }) => {
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


class Algorithms extends Component {
  constructor(props){  
    super(props);  
  }

  render() {
    return (
      <div className="bodyAlgorithm">
        <DropDown></DropDown>
        <Grid></Grid>
      </div>
    );
  }
}
 
export default Algorithms;