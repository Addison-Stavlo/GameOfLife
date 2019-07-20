class GameOfLife {
  constructor(
    height,
    width,
    gameMode = "classic",
    iso_limit = 3,
    sufo_limit = 6
  ) {
    this.height = height;
    this.width = width;
    this.matrix = this.generateMatrix();
    this.prevMatrix = this.generateMatrix();
    this.gameMode = gameMode;
    this.ISOLATION_LIMIT = iso_limit;
    this.SUFFOCATION_LIMIT = sufo_limit;
    this.numActive = 0;
    // this.activeCells = {};
  }

  generateMatrix() {
    const matrix = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      matrix[i] = new Array(this.width).fill(0);
    }
    return matrix;
  }

  toggleCell(row, col) {
    this.matrix[row][col] = this.matrix[row][col] === 0 ? 1 : 0;
    // ---- for calcNextGenEff functionality
    // if (this.activeCells[`${row}-${col}`]) {
    //   delete this.activeCells[`${row}-${col}`];
    // } else {
    //   this.activeCells[`${row}-${col}`] = 1;
    // }
  }

  randomizeBoard(ratioToActivate) {
    for (let row in this.matrix) {
      for (let col in this.matrix[row]) {
        if (Math.random() <= ratioToActivate) {
          this.matrix[row][col] = 1;
          this.numActive += 1;
        }
      }
    }
  }

  calcNextGen() {
    const matrix = this.generateMatrix();
    let numActive = 0;
    for (let row = 0; row < this.height; row++) {
      for (let i = 0; i < this.width; i++) {
        let liveNeighbors = this.countNeighbors(row, i);
        // custom game rules
        if (this.gameMode === "custom") {
          if (
            liveNeighbors >= this.ISOLATION_LIMIT &&
            liveNeighbors <= this.SUFFOCATION_LIMIT
          ) {
            matrix[row][i] = 1;
            numActive += 1;
          } else {
            matrix[row][i] = 0;
          }
        }
        // classic rules
        else {
          if (this.matrix[row][i] === 1) {
            if (liveNeighbors === 2 || liveNeighbors === 3) {
              matrix[row][i] = 1;
              numActive += 1;
            } else {
              matrix[row][i] = 0;
            }
          } else {
            if (liveNeighbors === 3) {
              matrix[row][i] = 1;
              numActive += 1;
            }
          }
        }
      }
    }
    this.prevMatrix = this.matrix;
    this.matrix = matrix;
    this.numActive = numActive;
  }
  // prettier-ignore
  countNeighbors(row, col) {
    let sumNeighbors = (this.matrix[row][col - 1]       ? 1 : 0)
                        + (this.matrix[row][col + 1]    ? 1 : 0)
    if (this.matrix[row - 1]) {
        sumNeighbors += (this.matrix[row - 1][col - 1]      ? 1 : 0) 
                        + (this.matrix[row - 1][col]        ? 1 : 0) 
                        + (this.matrix[row - 1][col + 1]    ? 1 : 0)
    }
    if (this.matrix[row+1]) {
        sumNeighbors += (this.matrix[row + 1][col - 1]      ? 1 : 0) 
                        + (this.matrix[row + 1][col]        ? 1 : 0) 
                        + (this.matrix[row + 1][col + 1]    ? 1 : 0)
    }
    return sumNeighbors;
  }

  // ---- for calcNextGenEff functionality
  // secondary next Gen function, optimal for small # of active cells
  // less optimal once grid is near full?
  // wrote this to test performance but still limited by reacts re-rendering speed
  // calcNextGenEff() {
  //   const matrix = this.generateMatrix();
  //   const activeCells = {};
  //   const cellsToCheck = this.calcCellsToCheck();
  //   let row;
  //   let col;
  //   for (let each in cellsToCheck) {
  //     [row, col] = each.split("-");
  //     row = Number(row);
  //     col = Number(col);
  //     let liveNeighbors = this.countNeighbors(row, col);

  //     // custom game rules
  //     if (this.gameMode === "custom") {
  //       if (
  //         liveNeighbors >= this.ISOLATION_LIMIT &&
  //         liveNeighbors <= this.SUFFOCATION_LIMIT
  //       ) {
  //         matrix[row][col] = 1;
  //         activeCells[`${row}-${col}`] = 1;
  //       } else {
  //         matrix[row][col] = 0;
  //       }
  //     }

  //     // classic rules
  //     else {
  //       if (this.matrix[row][col] === 1) {
  //         if (liveNeighbors === 2 || liveNeighbors === 3) {
  //           matrix[row][col] = 1;
  //           activeCells[`${row}-${col}`] = 1;
  //         } else {
  //           matrix[row][col] = 0;
  //         }
  //       } else {
  //         if (liveNeighbors === 3) {
  //           matrix[row][col] = 1;
  //           activeCells[`${row}-${col}`] = 1;
  //         }
  //       }
  //     }
  //   }
  //   this.activeCells = activeCells;
  //   this.prevMatrix = this.matrix;
  //   this.matrix = matrix;
  // }

  // ---- for calcNextGenEff functionality
  // return dictionary of keys to calculate for next gen
  //   calcCellsToCheck() {
  //     const cellsToCheck = {};
  //     console.log(this.activeCells);
  //     // add neighbors of live cells to list
  //     for (let each in this.activeCells) {
  //       cellsToCheck[each] = 1;
  //       let [row, col] = each.split("-");
  //       row = Number(row);
  //       col = Number(col);
  //       // adjacent neigbors
  //       if (this.matrix[row][col - 1] !== undefined) {
  //         cellsToCheck[`${row}-${col - 1}`] = 1;
  //       }
  //       if (this.matrix[row][col + 1] !== undefined) {
  //         cellsToCheck[`${row}-${col + 1}`] = 1;
  //       }
  //       // neighbors below
  //       if (this.matrix[row - 1]) {
  //         if (this.matrix[row - 1][col - 1] !== undefined) {
  //           cellsToCheck[`${row - 1}-${col - 1}`] = 1;
  //         }
  //         if (this.matrix[row - 1][col] !== undefined) {
  //           cellsToCheck[`${row - 1}-${col}`] = 1;
  //         }
  //         if (this.matrix[row - 1][col + 1] !== undefined) {
  //           cellsToCheck[`${row - 1}-${col + 1}`] = 1;
  //         }
  //       }
  //       // neighbors above
  //       if (this.matrix[row + 1]) {
  //         if (this.matrix[row + 1][col - 1] !== undefined) {
  //           cellsToCheck[`${row + 1}-${col - 1}`] = 1;
  //         }
  //         if (this.matrix[row + 1][col] !== undefined) {
  //           cellsToCheck[`${row + 1}-${col}`] = 1;
  //         }
  //         if (this.matrix[row + 1][col + 1] !== undefined) {
  //           cellsToCheck[`${row + 1}-${col + 1}`] = 1;
  //         }
  //       }
  //     }
  //     console.log(cellsToCheck);
  //     return cellsToCheck;
  //   }
}

export default GameOfLife;
