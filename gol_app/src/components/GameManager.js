import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";

let game = new GameOfLife(50, 50, "custom");
let intervalId;

class GameManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 50,
      width: 50,
      ruleSet: "custom",
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
    this.setState({ isRunning: false, matrix: [[]] });
    clearInterval(intervalId);

    game = new GameOfLife(
      Number(this.state.height),
      Number(this.state.height),
      this.state.ruleSet
    );
    this.setState({ matrix: game.matrix });
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
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

        {/* Options */}
        <div>
          <h1 style={{ color: "white", margin: "10px" }}>Options</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px"
            }}
          >
            <h3 style={{ color: "white", marginRight: "10px" }}>Grid Size: </h3>
            <select
              name="height"
              value={this.state.height}
              onChange={this.handleChange}
            >
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px"
            }}
          >
            <h3 style={{ color: "white", marginRight: "10px" }}>Rule Set: </h3>
            <select
              name="ruleSet"
              value={this.state.ruleSet}
              onChange={this.handleChange}
            >
              <option value={"custom"}>Custom</option>
              <option value={"classic"}>Classic</option>
            </select>
          </div>
          <button onClick={this.reset}>Set Options</button>
        </div>
      </>
    );
  }
}

export default GameManager;
