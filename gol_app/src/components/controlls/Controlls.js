import React from "react";
import styled from "styled-components";

export default function Controls(props) {
  return (
    <Controller>
      <h2>Controls</h2>
      <div className="button-holder">
        <button
          onClick={props.isRunning ? null : props.calcNextGen}
          disabled={props.isRunning}
        >
          Next Gen
        </button>
        <button
          onClick={props.isRunning ? null : props.play}
          disabled={props.isRunning}
        >
          Play
        </button>
        <button onClick={props.pause} disabled={!props.isRunning}>
          Pause
        </button>
        <button onClick={props.reset}>Reset</button>
      </div>
      <div className="gameFPS-bar">
        <h3>Game FPS {props.gameFPS}</h3>
        <input
          name="gameFPS"
          type="range"
          min={1}
          max={30}
          value={props.gameFPS}
          onChange={props.handleChange}
        />
      </div>
    </Controller>
  );
}

const Controller = styled.div`
  border: 1px solid white;

  h2 {
    color: white;
    margin: 5px;
  }

  .button-holder {
    width: 500px;
    display: flex;
    justify-content: space-around;
  }

  .gameFPS-bar {
    color: white;
    display: flex;
    justify-content: center;
  }
`;
