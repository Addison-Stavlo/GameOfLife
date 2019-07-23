import React from "react";
import styled from "styled-components";

export default function Options(props) {
  return (
    <OptionsWrapper>
      <h1>Create Game</h1>
      <Option>
        <h3>Seed Chance: {props.seedChance}</h3>
        <input
          name="seedChance"
          value={props.seedChance}
          type="range"
          min={0}
          max={100}
          onChange={props.handleChange}
          className="slider"
        />
      </Option>
      <Option>
        <h3>Grid Size: </h3>
        <select name="width" value={props.width} onChange={props.handleChange}>
          {[20, 30, 40, 50, 60, 70, 80].map(each => (
            <option value={each}>{each}</option>
          ))}
        </select>
      </Option>
      <Option>
        <h3>Rule Set: </h3>
        <select
          name="ruleSet"
          value={props.ruleSet}
          onChange={props.handleChange}
        >
          <option value={"custom"}>Custom</option>
          <option value={"classic"}>Classic</option>
        </select>
      </Option>
      {/* ---Custom Rules Options--- */}
      {props.ruleSet === "custom" ? (
        <>
          <Option>
            <h3>Suffocation Limit: {props.suffocationLimit}</h3>
            <input
              name="suffocationLimit"
              value={props.suffocationLimit}
              type="range"
              min={0}
              max={9}
              onChange={props.handleChange}
              className="slider"
            />
          </Option>
          <Option>
            <h3>Isolation Limit: {props.isolationLimit}</h3>
            <input
              name="isolationLimit"
              value={props.isolationLimit}
              type="range"
              min={0}
              max={9}
              onChange={props.handleChange}
              className="slider"
            />
          </Option>
        </>
      ) : null}
      <button onClick={props.reset}>Create Game Board</button>
    </OptionsWrapper>
  );
}

const OptionsWrapper = styled.div`
  border: 1px solid white;

  h1 {
    color: white;
    margin: 5px;
  }
  p {
    color: white;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const Option = styled.div`
  text-align: left;
  margin: 5px;
  display: flex;
  align-items: center;

  h3 {
    display: inline-block;
    color: white;
    margin-right: 10px;
  }

  select {
    /* none for now */
  }

  input {
    width: 20px;
  }

  .slider {
    width: 100px;
  }
`;
