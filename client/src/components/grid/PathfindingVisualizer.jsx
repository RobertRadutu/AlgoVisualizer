import React, {Children, Component} from 'react';
import { useState } from 'react';
import Node from './node/node';
import {dijkstra, getNodesInShortestPathOrder, visualizeDijkstra} from "../algo/dijkstra";
import {astar} from "../algo/astar";
import './grid.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Algorithms';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const object = this.props.object;
    let newGrid = []
    if(object == "wall")
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    else
      newGrid = getNewGridWithStopToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    const object = this.props.object;
    if (!this.state.mouseIsPressed) return;
    let newGrid = [];
    if(object == "wall")
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    else
      newGrid = getNewGridWithStopToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }


  //Dijkstra related functions
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
//---------------------------------



visualizeAstar(){
  const {grid} = this.state;
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const visitedNodesInOrder = astar(grid, startNode, finishNode);
  if(visitedNodesInOrder.length == 0)return;
  this.animateDijkstra(visitedNodesInOrder, visitedNodesInOrder);
}


//-----------------------------------
  displayAlgorithm(algorithm){
    if(algorithm == "Dijkstra"){
      regenerateGrid(this.state.grid);
      this.visualizeDijkstra();
    }
      
    else if(algorithm == "A*")
    {
      regenerateGrid(this.state.grid);
      this.visualizeAstar();
    }
      
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    const {
      algorithm
    } = this.props;
    return (
      <>
        <div className="boxGrid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall, isStop} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isStop={isStop}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
          {this.displayAlgorithm(algorithm)}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 55; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isStop: false,
    previousNode: null,
  };
};

const regenerateGrid = (newGrid) => {
  let obj = [];
  for(let i = 0; i < 20; i++){
    for(let j = 0; j < 55; j++)
      if(newGrid[i][j].isFinish == false && newGrid[i][j].isStart == false && newGrid[i][j].isWall == false && newGrid[i][j].isStop == false)
      {
        document.getElementById(`node-${i}-${j}`).className =
          'node';
      }
  }
  return newGrid;
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStop: false,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return regenerateGrid(newGrid);
};


//This is when trying to add a stop , generating a new grid
const getNewGridWithStopToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: false,
    isStop: !node.isStop,
  };
  newGrid[row][col] = newNode;
  return regenerateGrid(newGrid);
};