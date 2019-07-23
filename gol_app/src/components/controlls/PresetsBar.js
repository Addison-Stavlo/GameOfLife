import React from "react";
import styled from "styled-components";

export default function PresetsBar(props) {
  const PresetWrapper = styled.div``;
  return (
    <PresetWrapper>
      {props.presets.map(preset => (
        <button
          onClick={() => props.loadPreset(preset)}
          //   disabled={props.isRunning}
        >
          {preset.name}
        </button>
      ))}
    </PresetWrapper>
  );
}
