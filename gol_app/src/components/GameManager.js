import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";

let game = new GameOfLife(50, 50, "custom");
let intervalId;

class GameManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [[]],
      isRunning: false
    };
  }

  componentDidMount() {
    this.setState({
      matrix: game.matrix
    });
  }

  calcNextGen = () => {
    game.calcNextGen();
    this.setState({
      matrix: game.matrix
    });
  };

  play = () => {
    this.setState({ isRunning: true });
    intervalId = setInterval(this.calcNextGen, 200);
  };

  pause = () => {
    this.setState({ isRunning: false });
    clearInterval(intervalId);
  };

  reset = () => {
    this.setState({ isRunning: false });
    clearInterval(intervalId);
    game = new GameOfLife(50, 50, "custom");
  };

  render() {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.matrix.map((row, index) => (
            <Row
              row={row}
              index={index}
              game={game}
              key={`row${index}`}
              isRunning={this.state.isRunning}
            />
          ))}
        </div>
        <button onClick={this.state.isRunning ? null : this.calcNextGen}>
          Next Gen
        </button>
        <button onClick={this.state.isRunning ? null : this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
        <button onClick={this.reset}>Reset</button>
      </>
    );
  }
}

export default GameManager;
