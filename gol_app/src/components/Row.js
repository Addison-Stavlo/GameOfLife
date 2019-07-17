import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

function Row(props) {
  const RowBox = styled.div`
    box-sizing: border-box;
    height: 20px;
    margin: 0 auto;
  `;
  return (
    <RowBox>
      {props.row.map((cell, index) => (
        <Cell row={props.index} col={index} cell={cell} game={props.game} />
      ))}
    </RowBox>
  );
}

export default Row;
