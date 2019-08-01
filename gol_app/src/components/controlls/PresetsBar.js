import React from "react";
import styled from "styled-components";

export default function PresetsBar(props) {
  return (
    <PresetWrapper>
      <h2>Presets</h2>
      <div>
        {props.presets.map(preset => (
          <button
            onClick={() => props.loadPreset(preset)}
            //   disabled={props.isRunning}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </PresetWrapper>
  );
}

const PresetWrapper = styled.div`
  border: 1px solid white;
  h2 {
    color: white;
    margin: 5px;
  }

  div {
    display: flex;
    justify-content: space-around;
  }
`;
