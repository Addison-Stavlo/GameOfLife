import React from "react";
import styled from "styled-components";

class Cell extends React.Component {
  toggleCell = () => {
    console.log(this.props.cell);
    this.props.game.toggleCell(this.props.row, this.props.col);
    this.forceUpdate();
  };

  render() {
    return (
      <CellBox
        onClick={this.toggleCell}
        cellColor={
          this.props.game.matrix[this.props.row][this.props.col]
            ? "green"
            : "brown"
        }
      />
    );
  }
}

const CellBox = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: 20px;
  width: 20px;
  background: ${props => props.cellColor};
  border-bottom: 1px dashed black;
  border-right: 1px dashed black;
`;

export default Cell;
