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
            <h5>Welcome to our algorithm visualizer website! We've created this website to help you better understand how algorithms work and how they can be used to solve problems. Whether you're a beginner or an expert, our website provides a wide range of visualizations and explanations to help you learn and explore.</h5>
            <h5>P.S. Check out our Informations page for FAQs.</h5>
            <h3>Have fun!</h3>
            </div>
      </div>
    );
  }
}

export default Home;