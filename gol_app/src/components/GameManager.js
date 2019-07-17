import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";

let game = new GameOfLife(75, 75, "custom");
let intervalId;

class GameManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [[]],
      running: false
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
    this.setState({ running: true });
    intervalId = setInterval(this.calcNextGen, 200);
  };

  pause = () => {
    this.setState({ running: false });
    clearInterval(intervalId);
  };

  reset = () => {
    this.setState({ running: false });
    clearInterval(intervalId);
    game = new GameOfLife(75, 75, "custom");
  };

  render() {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.matrix.map((row, index) => (
            <Row row={row} index={index} game={game} key={`row${index}`} />
          ))}
        </div>
        <button onClick={this.calcNextGen}>Next Gen</button>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
        <button onClick={this.reset}>Reset</button>
      </>
    );
  }
}

export default GameManager;
