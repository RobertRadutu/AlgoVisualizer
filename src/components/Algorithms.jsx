import React, { Component } from "react";
import Grid from "./grid/PathfindingVisualizer";

var algo = "";
 
const DropDown = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    algo = "dijkstra";
    setOpen(false);
  }

  const handleMenuTwo = () => {
    algo = "a*";
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
    this.state = "";
  }

  onHandleChange(){
    this.setState(algo);
    console.log(algo);
  }
  render() {
    return (
      <div className="bodyAlgorithm">
        <DropDown onChange ={this.onHandleChange}></DropDown>
        <Grid algorithm = {this.state}></Grid>
      </div>
    );
  }
}

export default Algorithms;