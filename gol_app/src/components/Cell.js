import React from "react";
import styled from "styled-components";

class Cell extends React.PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   let [row, col] = this.props;
  //   if (
  //     nextProps.game.matrix[row][col] === this.props.game.matrix[row][col] &&
  //     nextProps.game.prevMatrix[row][col] ===
  //       this.props.game.prevMatrix[row][col]
  //   ) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  toggleCell = () => {
    console.log(this.props.cell);
    this.props.game.toggleCell(this.props.row, this.props.col);
    this.forceUpdate();
  };

  determineColor = () => {
    if (this.props.game.matrix[this.props.row][this.props.col]) {
      // active and established
      if (this.props.game.prevMatrix[this.props.row][this.props.col]) {
        return "green";
      }
      // active and new
      else {
        return "limegreen";
      }
    } else {
      // inactive and decaying
      if (this.props.game.prevMatrix[this.props.row][this.props.col]) {
        return "orange";
      }
      // inactive and decayed
      else {
        return "rgb(61, 38, 9)";
      }
    }
  };

  render() {
    return (
      <CellBox onClick={this.toggleCell} cellColor={this.determineColor()} />
    );
  }
}

const CellBox = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: 15px;
  width: 15px;
  background: ${props => props.cellColor};
  border-bottom: 1px dashed black;
  border-right: 1px dashed black;
`;

export default Cell;
