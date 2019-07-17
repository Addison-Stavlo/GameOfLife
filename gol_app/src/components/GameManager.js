import React from "react";
import Row from "./Row";
import GameOfLife from "../gol_logic/GameOfLife.js";

let game = new GameOfLife(50, 50);

class GameManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [[]]
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

  render() {
    return (
      <>
        {this.state.matrix.map((row, index) => (
          <Row row={row} index={index} game={game} />
        ))}
        <button onClick={this.calcNextGen}>Next Gen</button>
      </>
    );
  }
}

export default GameManager;
