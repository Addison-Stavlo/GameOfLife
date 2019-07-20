import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";
import styled from "styled-components";
import TitleText from "./headers/TitleText";
import ColorDescriptions from "./headers/ColorDescriptions";
import Options from "./options/Options";

let game;
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
    this.loadPreset1();
  }

  loadPreset1 = () => {
    game = new GameOfLife(50, 50, "custom");
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
  };

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

        <Options
          height={this.state.height}
          handleChange={this.handleChange}
          ruleSet={this.state.ruleSet}
          suffocationLimit={this.state.suffocationLimit}
          isolationLimit={this.state.isolationLimit}
          reset={this.reset}
        />
      </>
    );
  }
}

export default GameManager;
