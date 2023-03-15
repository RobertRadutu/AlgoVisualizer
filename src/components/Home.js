import React, { Component } from "react";
import "./style.css"
 
class Home extends Component {
  render() {
    return (
      <div >
        <div className="container">
        <h2>HELLO!</h2>
        <br></br>
        <h2>Welcome to Pathfinding Visualizer!</h2>
        <h3>This short tutorial will walk you through all of the features of this application.</h3>
            <p>If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!</p>
        <p>This is an interactive algorithm visualization tool for path-finding and sorting algorithms! </p>
 
            <p>Have fun!</p>
            </div>
      </div>
    );
  }
}
 
export default Home;