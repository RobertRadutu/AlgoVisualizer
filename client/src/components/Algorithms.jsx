import React, { Component } from "react";
import Grid from "./grid/PathfindingVisualizer";
const DropDown = () => {
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
       <Dropdown
          open={open}
          algorithm={algrithm}
          trigger={<button onClick={handleOpen}>Choose the algorithm you want to visualize</button>}
          menu={[
            <button onClick={handleMenuOne}>Dijkstra</button>,
            <button onClick={handleMenuTwo}>A*</button>,
          ]}
       />
  );
};

const Dropdown = ({ open, algorithm, trigger, menu }) => {
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
       <Grid algorithm = {algorithm}></Grid>
    </div>
  );
};


export class Algorithms extends Component {
  constructor(props){  
    super(props);  
  }

  render() {
    return (
      <div className="bodyAlgorithm">
        <DropDown></DropDown>
      </div>
    );
  }
}

export default Algorithms;