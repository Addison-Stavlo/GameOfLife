import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

class Row extends React.PureComponent {
  render() {
    return (
      <RowBox>
        {this.props.row.map((cell, index) => (
          <Cell
            row={this.props.index}
            col={index}
            cell={cell}
            prevCell={this.props.game.prevMatrix[this.props.index][index]}
            game={this.props.game}
            key={`cell${this.props.index}${index}`}
            isRunning={this.props.isRunning}
          />
        ))}
      </RowBox>
    );
  }
}

const RowBox = styled.div`
  box-sizing: border-box;
  height: 15px;
  margin: 0 auto;
`;
export default Row;
