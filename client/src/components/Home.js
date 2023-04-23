import React, { Component } from "react";
import "./style.css"
 
class Home extends Component {
  render() {
    return (
      <div >
        <div className="containertext">
        <h2>HELLO!</h2>
        <br></br>
        <h2>Welcome to Pathfinding Visualizer!</h2>
        <h4>This is an interactive algorithm visualization tool for path-finding and sorting algorithms! </h4>
            <h5>If you want to dive right in, feel free to go to the Algorithms Visualization page. Make sure to leave us a message on the Forum page, by creating a post!</h5>
            <h5>P.S. Check out our Informations page for FAQs.</h5>
            <h3>Have fun!</h3>
            </div>
      </div>
    );
  }
}
 
export default Home;