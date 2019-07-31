import React from "react";
import styled from "styled-components";

export default function TitleText(props) {
  return (
    <Title>
      <h1>Addie's Cellular Automata</h1>
      <p>(& Conway's Game of Life)</p>
      <p>
        A Cellular Automaton is discrete mathematical model consisting of a grid
        of cells whose current state is dependant only on its previous state and
        a set of predetermined rules. Each generation is calculated by
        evaluating the amount of active neighbors each cell has. Depending on
        the amount of active neighbors and the ruleset, a cell may become
        activated or deactivated. Given a fixed ruleset, the same initial state
        will evolve in the same manner every time it is run. Cellular Automata
        have given aid to various fields of scientific research including
        biology, physics, and chemistry.{" "}
      </p>
    </Title>
  );
}

const Title = styled.div`
  /* border: 2px solid rgb(70, 70, 70); */
  max-width: 300px;
  margin: 0 auto;
  h1 {
    color: white;
    font-size: 30px;
    margin-bottom: 10px;
  }

  p {
    color: white;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;
