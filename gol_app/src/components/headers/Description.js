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
      <p>
        One of the most famous implementations of a CA is Conway's Game of Life.
        Developed by mathematician John Conway in 1970, the Game of Life has
        been a topic of interest in mathematics and computer science ever since.
        This universal Turing machine was build with some very simple rules and
        holds the power to compute anything that can be computed
        algorithmically.
      </p>
      <p>
        Conway's Rules are:
        <ul>
          <li>
            <span>
              If a dead cell has exactly 3 live neighbors it will come to life.
            </span>
          </li>
          <li>
            <span>
              If a live cell does not have exactly 2 or 3 live neighbors then it
              dies.
            </span>
          </li>
        </ul>
      </p>
    </Descriptor>
  );
}

const Descriptor = styled.section`
  color: white;
  max-width: 750px;
  line-height: 18px;
  margin: 0 auto;

  p {
    text-align: left;
    text-indent: 40px;
    margin: 15px 0;
  }

  ul {
    max-width: 80%;
    list-style-type: circle;
    margin: 10px auto;

    span {
      position: relative;
      left: -30px;
    }
  }
`;
