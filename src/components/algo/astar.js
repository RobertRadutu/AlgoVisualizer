let ROW;
let COL;
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const createNode = (row, col) => {
    return {
      row,
      col,
    };
  };


function tracePath(cellDetails, dest){
    const visitedNodesInOrder = [];
    let i = dest.row;
    let j = dest.col;
    while(cellDetails[i][j].parent_i != i || cellDetails[i][j].parent_j != j){
        let node = createNode(i, j);
        visitedNodesInOrder.push(node);
        let parent_i = cellDetails[i][j].parent_i;
        let parent_j = cellDetails[i][j].parent_j;
        i = parent_i;
        j = parent_j;
    }
    visitedNodesInOrder.reverse();
    return visitedNodesInOrder;
}

function calculateHValue(row, col, dest){
    return (Math.sqrt(
        (row - dest.row) * (row - dest.row)
        + (col - dest.col) * (col - dest.col)));
}

function isValid(row, col){
    return (row >= 0) && (row < ROW) && (col >= 0) && (col < COL);
}

function isDestination(startNode_i, startNode_j, finishNode_i, finishNode_j){
    if(startNode_i == finishNode_i && startNode_j == finishNode_j) 
        return true;
    return false;
}

function isBlocked(node){
    if(node.isWall)
        return true;
    else
        return false;
}

export function astar(grid, startNode, endNode){
    ROW = 20;
    COL = 55;

    const allNodes = getAllNodes(grid);
    if(isValid(startNode.row, startNode.col) == false){
        console.log("Source is invalid.\n");
        return;
    }

    if(isValid(endNode.row, endNode.col) == false){
        console.log("Destination is invalid.\n");
        return;
    }

    if (isDestination(startNode.row, startNode.col, endNode.row, endNode.col) == true) {
        console.log("We are already at the destination\n");
        return;
    }
    const m = 20;
    const n = 55;
    
    let closedList = []; 
    for (let i = 0; i<m; i++) {
        closedList[i] = [];
        for(let j = 0; j<n; j++)
            closedList[i][j] = false;
    }

    const openList = [];

    var Obj = function(){
        return {
            f : 0,
            g : 0,
            h : 0,
            parent_i : -1,
            parent_j : -1,
        };
    }
    let cellDetails = [];

    // inserting elements to array
    for (let i = 0; i<m; i++) {
        cellDetails[i] = [];
        for(let j = 0; j<n; j++) {
            cellDetails[i][j] = Obj();
        }
    }
  
 let i, j;
    for (i = 0; i < ROW; i++) {
        for (j = 0; j < COL; j++) {
            cellDetails[i][j].f = 1000000;
            cellDetails[i][j].g = 1000000;
            cellDetails[i][j].h = 1000000;
            cellDetails[i][j].parent_i = -1;
            cellDetails[i][j].parent_j = -1;
        }
    }

    i = startNode.row;
    j = startNode.col;
    cellDetails[i][j].f = 0;
    cellDetails[i][j].g = 0;
    cellDetails[i][j].h = 0;
    cellDetails[i][j].parent_i = i;
    cellDetails[i][j].parent_j = j;

    openList.push({
        f : 0,
        row : i,
        col : j,
    });

    let foundDest = false;

    while(openList.length != 0){
        openList.sort((a, b) => a.f > b.f);
        //console.log(openList);
        let cell = openList.shift();
        let row = cell.row;
        let col = cell.col;
        closedList[row][col] = true;
        let gNew, hNew, fNew;

        if(isValid(row-1, col) == true){
            if(isDestination(row-1, col, endNode.row, endNode.col) == true){
                cellDetails[row-1][col].parent_i = row;
                cellDetails[row-1][col].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row-1][col] == false && isBlocked(allNodes[(row-1)*55 + col]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row - 1, col, endNode);
                fNew = gNew + hNew;

                if (cellDetails[row - 1][col].f == 1000000
                    || cellDetails[row - 1][col].f > fNew) {
                    openList.push({f:fNew, row : row - 1, col : col})
 
                    // Update the details of this cell
                    cellDetails[row - 1][col].f = fNew;
                    cellDetails[row - 1][col].g = gNew;
                    cellDetails[row - 1][col].h = hNew;
                    cellDetails[row - 1][col].parent_i = row;
                    cellDetails[row - 1][col].parent_j = col;
                }
            }
        }

        if(isValid(row-1, col-1) == true){
            if(isDestination(row-1, col-1, endNode.row, endNode.col) == true){
                cellDetails[row-1][col-1].parent_i = row;
                cellDetails[row-1][col-1].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row-1][col-1] == false && isBlocked(allNodes[(row-1) * 55 + col - 1]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row - 1, col - 1, endNode);
                fNew = gNew + hNew;

                if (cellDetails[row - 1][col - 1].f == 1000000
                    || cellDetails[row - 1][col - 1].f > fNew) {
                    openList.push({f:fNew, row : row - 1, col : col - 1})
 
                    // Update the details of this cell
                    cellDetails[row - 1][col - 1].f = fNew;
                    cellDetails[row - 1][col - 1].g = gNew;
                    cellDetails[row - 1][col - 1].h = hNew;
                    cellDetails[row - 1][col - 1].parent_i = row;
                    cellDetails[row - 1][col - 1].parent_j = col;
                }
            }
        }

        
        if(isValid(row, col-1) == true){
            if(isDestination(row, col-1, endNode.row, endNode.col) == true){
                cellDetails[row][col-1].parent_i = row;
                cellDetails[row][col-1].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row][col-1] == false && isBlocked(allNodes[row * 55 + col - 1]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row, col - 1, endNode);
                fNew = gNew + hNew;

                if (cellDetails[row][col - 1].f == 1000000
                    || cellDetails[row][col - 1].f > fNew) {
                    openList.push({f:fNew, row : row, col : col - 1})
 
                    // Update the details of this cell
                    cellDetails[row][col - 1].f = fNew;
                    cellDetails[row][col - 1].g = gNew;
                    cellDetails[row][col - 1].h = hNew;
                    cellDetails[row][col - 1].parent_i = row;
                    cellDetails[row][col - 1].parent_j = col;
                }
            }
        }


        if(isValid(row+1, col-1) == true){
            if(isDestination(row+1, col-1, endNode.row, endNode.col) == true){
                cellDetails[row+1][col-1].parent_i = row;
                cellDetails[row+1][col-1].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row+1][col-1] == false && isBlocked(allNodes[(row+1) * 55 + col - 1]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row+1, col - 1, endNode);
                fNew = gNew + hNew;

                if (cellDetails[row + 1][col - 1].f == 1000000
                    || cellDetails[row + 1][col - 1].f > fNew) {
                    openList.push({f:fNew, row : row + 1, col : col - 1})
 
                    // Update the details of this cell
                    cellDetails[row + 1][col - 1].f = fNew;
                    cellDetails[row + 1][col - 1].g = gNew;
                    cellDetails[row + 1][col - 1].h = hNew;
                    cellDetails[row + 1][col - 1].parent_i = row;
                    cellDetails[row + 1][col - 1].parent_j = col;
                }
            }
        }

        if(isValid(row+1, col) == true){
            if(isDestination(row+1, col, endNode.row, endNode.col) == true){
                cellDetails[row+1][col].parent_i = row;
                cellDetails[row+1][col].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row+1][col] == false && isBlocked(allNodes[(row+1) * 55 + col]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row+1, col, endNode);
                fNew = gNew + hNew;

                if (cellDetails[row + 1][col].f == 1000000
                    || cellDetails[row + 1][col].f > fNew) {
                    openList.push({f:fNew,  row : row + 1, col : col})
 
                    // Update the details of this cell
                    cellDetails[row + 1][col].f = fNew;
                    cellDetails[row + 1][col].g = gNew;
                    cellDetails[row + 1][col].h = hNew;
                    cellDetails[row + 1][col].parent_i = row;
                    cellDetails[row + 1][col].parent_j = col;
                }
            }
        }


        if(isValid(row+1, col+1) == true){
            if(isDestination(row+1, col+1, endNode.row, endNode.col) == true){
                cellDetails[row+1][col+1].parent_i = row;
                cellDetails[row+1][col+1].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row+1][col+1] == false && isBlocked(allNodes[(row + 1) * 55 + col + 1]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row+1, col+1, endNode);
                fNew = gNew + hNew;
                if (cellDetails[row + 1][col + 1].f == 1000000
                    || cellDetails[row + 1][col + 1].f > fNew) {
                    openList.push({f:fNew, row : row + 1, col : col + 1})
 
                    // Update the details of this cell
                    cellDetails[row + 1][col + 1].f = fNew;
                    cellDetails[row + 1][col + 1].g = gNew;
                    cellDetails[row + 1][col + 1].h = hNew;
                    cellDetails[row + 1][col + 1].parent_i = row;
                    cellDetails[row + 1][col + 1].parent_j = col;
                }
            }
        }

        if(isValid(row, col+1) == true){
            if(isDestination(row, col+1, endNode.row, endNode.col) == true){
                cellDetails[row][col+1].parent_i = row;
                cellDetails[row][col+1].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row][col+1] == false && isBlocked(allNodes[row * 55 + col + 1]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row, col+1, endNode);
                fNew = gNew + hNew;
                if (cellDetails[row][col + 1].f == 1000000
                    || cellDetails[row][col + 1].f > fNew) {
                    openList.push({f:fNew, row : row, col : col + 1})
 
                    // Update the details of this cell
                    cellDetails[row][col + 1].f = fNew;
                    cellDetails[row][col + 1].g = gNew;
                    cellDetails[row][col + 1].h = hNew;
                    cellDetails[row][col + 1].parent_i = row;
                    cellDetails[row][col + 1].parent_j = col;
                }
            }
        }

        if(isValid(row-1, col+1) == true){
            if(isDestination(row-1, col+1, endNode.row, endNode.col) == true){
                cellDetails[row-1][col+1].parent_i = row;
                cellDetails[row-1][col+1].parent_j = col;
                console.log("The destination cell is found\n");
                foundDest = true;
                return tracePath(cellDetails, endNode);
            }
            else if(closedList[row-1][col+1] == false && isBlocked(allNodes[(row - 1) * 55 + col + 1]) == false){
                gNew = cellDetails[row][col].g + 1;
                hNew = calculateHValue(row-1, col+1, endNode);
                fNew = gNew + hNew;

                if (cellDetails[row - 1][col + 1].f == 1000000
                    || cellDetails[row - 1][col + 1].f > fNew) {
                    openList.push({f:fNew, row : row - 1, col : col + 1})
 
                    // Update the details of this cell
                    cellDetails[row - 1][col + 1].f = fNew;
                    cellDetails[row - 1][col + 1].g = gNew;
                    cellDetails[row - 1][col + 1].h = hNew;
                    cellDetails[row - 1][col + 1].parent_i = row;
                    cellDetails[row - 1][col + 1].parent_j = col;
                }
            }
        }  
    }
    if (foundDest == false)
    console.log("Failed to find the Destination Cell\n");
    return [];
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }