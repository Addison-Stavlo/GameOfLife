import React from "react";
import styled from "styled-components";

export default function Description(props) {
  return (
    <Descriptor>
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
    </Descriptor>
  );
}

const Descriptor = styled.section`
  color: white;
  max-width: 750px;
  line-height: 18px;
  margin: 0 auto;
  text-align: left;
  text-indent: 40px;
`;
