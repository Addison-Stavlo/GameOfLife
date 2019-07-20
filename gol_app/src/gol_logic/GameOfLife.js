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
}

export default GameOfLife;
