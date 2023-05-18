import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Algorithms from "../Algorithms";
import PathfindingVisualizer, { createNode, getInitialGrid, getNewGridWithStopToggled, getNewGridWithWallToggled } from "./PathfindingVisualizer";
import {expect} from '@jest/globals';
import {astar} from "../algo/astar";
import {dijkstra, getNodesInShortestPathOrder} from "../algo/dijkstra";
import { getStateOfObstacle } from "../Algorithms";

test('Verify AStar`s algorithm simplest path', () => {
    render(<Algorithms/>);
    let expected = [];
    for(let i = 16; i<36; i++)
        expected.push({"col" : i, "row" : 10});
    userEvent.click(screen.getByText(/Start/i));
    const newGrid = getInitialGrid();
    const startNode = newGrid[10][15];
    const finishNode = newGrid[10][35];
    let ar = astar(newGrid, startNode, finishNode);
    expect(ar).toEqual(expected);
    screen.debug();
})

test("Verify Dijkstra`s algorithm simplest path", () => {
    render(<Algorithms/>);
    let expected = [];
    for(let i = 15; i<36; i++)
        expected.push({"row" : 10, "col" : i});
    const newGrid = getInitialGrid();
    const startNode = newGrid[10][15];
    const finishNode = newGrid[10][35];
    let ar = dijkstra(newGrid, startNode, finishNode);
    ar = getNodesInShortestPathOrder(finishNode);
    for(let i = 0; i<ar.length; i++)
        ar[i] = {"row":ar[i].row, "col":ar[i].col};
    expect(ar).toEqual(expected);
})

test("Verify that when Wall Button is pressed and the user clicks the grid, a wall is placed", () => {
    let stop = {"col" : 10, "row" : 16};
    render(<Algorithms/>)
    // expect().toEqual("wall");
    // expect(getStateOfObstacle).toEqual("stop");
    userEvent.click(screen.getByRole('button', {name:"Add Wall"}));
    let newGrid = getInitialGrid();
    newGrid = getNewGridWithWallToggled(newGrid, 10, 16);
    expect(newGrid[10][16].isWall).toEqual(true);
})

test("Verify that when Stop Button is pressed and the user clicks the grid, a stop is placed", () => {
    let stop = {"col" : 10, "row" : 16};
    render(<Algorithms/>)
    // expect().toEqual("wall");
    // expect(getStateOfObstacle).toEqual("stop");
    userEvent.click(screen.getByRole('button', {name:"Add Stop"}));
    let newGrid = getInitialGrid();
    newGrid = getNewGridWithStopToggled(newGrid, 10, 16);
    expect(newGrid[10][16].isStop).toEqual(true);
})


test("", () => {
    render(<Algorithms/>);
    userEvent.click(screen.getByRole('button', {name:"Start"}));
    
;})
