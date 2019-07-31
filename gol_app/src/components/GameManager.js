import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";
import styled from "styled-components";
import TitleText from "./headers/TitleText";
import ColorDescriptions from "./headers/ColorDescriptions";
import Options from "./controlls/Options";
import Controls from "./controlls/Controlls";
import presets from "../gol_logic/presets";
import PresetsBar from "./controlls/PresetsBar";

let game = new GameOfLife(50, 50, "classic");
let intervalId;

class GameManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 50,
      isolationLimit: 3,
      suffocationLimit: 6,
      ruleSet: "classic",
      matrix: [[]],
      isRunning: false,
      gameFPS: 10,
      seedChance: 50
    };
  }

  componentDidMount() {
    game.randomizeBoard(Number(this.state.seedChance) / 100);
    this.setState({ matrix: game.matrix });
    this.play();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameFPS !== this.state.gameFPS && this.state.isRunning) {
      this.changeSpeed();
    }
  }

  loadPreset = preset => {
    this.setState({ isRunning: false, matrix: [[]] });
    clearInterval(intervalId);

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
      suffocationLimit: game.SUFFOCATION_LIMIT,
      ruleSet: game.gameMode
    });

    this.play();
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

    if (Number(this.state.seedChance) > 0) {
      game.randomizeBoard(Number(this.state.seedChance) / 100);
    }
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

        <div className="controls-wrapper">
          <div className="controls-vert">
            <Controls
              isRunning={this.state.isRunning}
              calcNextGen={this.calcNextGen}
              play={this.play}
              pause={this.pause}
              reset={this.reset}
              handleChange={this.handleChange}
              gameFPS={this.state.gameFPS}
            />
            <PresetsBar
              presets={presets}
              loadPreset={this.loadPreset}
              isRunning={this.state.isRunning}
              reset={this.reset}
            />
          </div>
          <Options
            width={this.state.width}
            handleChange={this.handleChange}
            ruleSet={this.state.ruleSet}
            suffocationLimit={this.state.suffocationLimit}
            isolationLimit={this.state.isolationLimit}
            seedChance={this.state.seedChance}
            reset={this.reset}
          />
        </div>
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

  .controls-wrapper {
    display: flex;

    .controls-vert {
      display: flex;
      flex-direction: column;
    }
  }
`;
