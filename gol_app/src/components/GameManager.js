import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";
import styled from "styled-components";
import TitleText from "./headers/TitleText";
import ColorDescriptions from "./headers/ColorDescriptions";

let game = new GameOfLife(50, 50, "custom");
let intervalId;

class GameManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 50,
      width: 50,
      isolationLimit: 3,
      suffocationLimit: 6,
      ruleSet: "custom",
      matrix: [[]],
      isRunning: false
    };
  }

  componentDidMount() {
    game.toggleCell(25, 25);
    game.toggleCell(24, 25);
    game.toggleCell(25, 24);
    game.toggleCell(24, 24);
    game.toggleCell(26, 26);
    this.setState({
      matrix: game.matrix,
      isolationLimit: game.ISOLATION_LIMIT,
      suffocationLimit: game.SUFFOCATION_LIMIT
    });
  }

  calcNextGen = () => {
    game.calcNextGen();
    this.setState({
      matrix: game.matrix
    });
    if (game.numActive === 0) {
      this.pause();
      setTimeout(
        () => alert("All life has wasted away...\nPlease try again!"),
        500
      );
    }
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
      this.state.ruleSet,
      Number(this.state.isolationLimit),
      Number(this.state.suffocationLimit)
    );
    console.log(this.state.isolationLimit);
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
        <TitleText />
        <ColorDescriptions />
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

        {/* ---Options--- */}
        <div>
          <h1
            style={{
              color: "white",
              margin: "10px",
              textDecoration: "underline",
              fontWeight: "bold"
            }}
          >
            Options
          </h1>
          <p style={{ color: "white", fontSize: "14px", marginBottom: "20px" }}>
            (note: be sure to hit "Set Options" or "Reset" button for the new
            options to take effect.)
          </p>
          {/* ---Size Option--- */}
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
          {/* ---Rules Option--- */}
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
          {/* ---Custom Rules Options--- */}
          {this.state.ruleSet === "custom" ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px"
                }}
              >
                <h3 style={{ color: "white", marginRight: "10px" }}>
                  Suffocation Limit:{" "}
                </h3>
                <input
                  style={{ width: "20px" }}
                  name="suffocationLimit"
                  value={this.state.suffocationLimit}
                  onChange={this.handleChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px"
                }}
              >
                <h3 style={{ color: "white", marginRight: "10px" }}>
                  Isolation Limit:{" "}
                </h3>
                <input
                  style={{ width: "20px" }}
                  name="isolationLimit"
                  value={this.state.isolationLimit}
                  onChange={this.handleChange}
                />
              </div>
            </>
          ) : null}
          <button onClick={this.reset}>Set Options</button>
        </div>
      </>
    );
  }
}

export default GameManager;
