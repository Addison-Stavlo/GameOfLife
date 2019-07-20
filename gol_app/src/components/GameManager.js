import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";
import styled from "styled-components";
import TitleText from "./headers/TitleText";
import ColorDescriptions from "./headers/ColorDescriptions";
import Options from "./controlls/Options";
import Controls from "./controlls/Controlls";

let game = new GameOfLife(50, 50, "custom");
let intervalId;

const preset1 = {
  size: 50,
  ruleType: "custom",
  isolationLimit: 3,
  suffocationLimit: 6,
  coords: [[25, 25], [24, 25], [25, 24], [24, 24], [26, 26]]
};

class GameManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 50,
      isolationLimit: 3,
      suffocationLimit: 6,
      ruleSet: "custom",
      matrix: [[]],
      isRunning: false,
      gameFPS: 5
    };
  }

  componentDidMount() {
    this.loadPreset(preset1);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameFPS !== this.state.gameFPS && this.state.isRunning) {
      this.changeSpeed();
    }
  }

  loadPreset = preset => {
    game = new GameOfLife(
      preset.size,
      preset.size,
      preset.ruleType,
      preset.isolationLimit,
      preset.suffocationLimit
    );

    for (let i in preset.coords) {
      game.toggleCell(preset.coords[i][0], preset.coords[i][1]);
    }

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
    intervalId = setInterval(
      this.calcNextGen,
      1000 / Number(this.state.gameFPS)
    );
  };

  pause = () => {
    this.setState({ isRunning: false });
    clearInterval(intervalId);
  };

  changeSpeed = () => {
    clearInterval(intervalId);
    intervalId = setInterval(
      this.calcNextGen,
      1000 / Number(this.state.gameFPS)
    );
  };

  reset = () => {
    this.setState({ isRunning: false, matrix: [[]] });
    clearInterval(intervalId);

    game = new GameOfLife(
      Number(this.state.width),
      Number(this.state.width),
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
      <ManagerWrapper width={`${game.width * 15 + 10}px`}>
        <TitleText />
        <ColorDescriptions />
        {this.state.matrix.map((row, index) => (
          <Row
            row={row}
            index={index}
            game={game}
            key={`row${index}`}
            isRunning={this.state.isRunning}
          />
        ))}
        <Controls
          isRunning={this.state.isRunning}
          calcNextGen={this.calcNextGen}
          play={this.play}
          pause={this.pause}
          reset={this.reset}
          handleChange={this.handleChange}
          gameFPS={this.state.gameFPS}
        />
        <Options
          width={this.state.width}
          handleChange={this.handleChange}
          ruleSet={this.state.ruleSet}
          suffocationLimit={this.state.suffocationLimit}
          isolationLimit={this.state.isolationLimit}
          reset={this.reset}
          state={this.state}
        />
      </ManagerWrapper>
    );
  }
}

export default GameManager;

const ManagerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${props => props.width};
  margin: 0 auto;

  button {
    width: 100px;
  }
`;
