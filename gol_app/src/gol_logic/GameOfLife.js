const ISOLATION_LIMIT = 3;
const SUFFOCATION_LIMIT = 6;

class GameOfLife {
  constructor(height, width, gameMode = "classic") {
    this.height = height;
    this.width = width;
    this.matrix = this.generateMatrix();
    this.prevMatrix = this.generateMatrix();
    this.gameMode = gameMode;
  }

  generateMatrix() {
    const matrix = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      matrix[i] = new Array(this.width).fill(0);
    }
    return matrix;
  }

  toggleCell(row, col) {
    this.matrix[row][col] = this.matrix[row][col] == 0 ? 1 : 0;
  }

  calcNextGen() {
    const matrix = this.generateMatrix();
    for (let row = 0; row < this.height; row++) {
      for (let i = 0; i < this.width; i++) {
        let liveNeighbors = this.countNeighbors(row, i);
        // custom game rules
        if (this.gameMode == "custom") {
          if (
            liveNeighbors >= ISOLATION_LIMIT &&
            liveNeighbors <= SUFFOCATION_LIMIT
          ) {
            matrix[row][i] = 1;
          } else {
            matrix[row][i] = 0;
          }
        }
        // classic rules
        else {
          if (this.matrix[row][i] === 1) {
            if (liveNeighbors === 2 || liveNeighbors === 3) {
              matrix[row][i] = 1;
            } else {
              matrix[row][i] = 0;
            }
          } else {
            if (liveNeighbors === 3) {
              matrix[row][i] = 1;
            }
          }
        }
      }
    }
    this.prevMatrix = this.matrix;
    this.matrix = matrix;
  }
  // prettier-ignore
  countNeighbors(row, col) {
    let sumNeighbors = (this.matrix[row][col - 1]       ? 1 : 0)
                        + (this.matrix[row][col + 1]    ? 1 : 0)
    if (this.matrix[row - 1]) {
      sumNeighbors += (this.matrix[row - 1][col - 1]        ? 1 : 0) 
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
}

// commented out console testing
// const game = new GameOfLife(10, 10);
// game.toggleCell(2, 4);
// game.toggleCell(0, 4);
// game.toggleCell(1, 3);
// console.log(game.matrix);
// game.calcNextGen();
// console.log(game.matrix);
export default GameOfLife;
