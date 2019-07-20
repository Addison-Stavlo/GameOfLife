import React from "react";
import styled from "styled-components";

export default function ColorDescriptions(props) {
  return (
    <DescriptionWrapper>
      <ColorDescriptor color={"limegreen"}>
        <div />
        <h1>New Life</h1>
      </ColorDescriptor>
      <ColorDescriptor color="green">
        <div />
        <h1>Established Life</h1>
      </ColorDescriptor>
      <ColorDescriptor color="orange">
        <div />
        <h1>Decaying Death</h1>
      </ColorDescriptor>
      <ColorDescriptor color="rgb(61, 38, 9)">
        <div />
        <h1>No Life</h1>
      </ColorDescriptor>
    </DescriptionWrapper>
  );
}

const DescriptionWrapper = styled.div`
  /* border: 2px solid rgb(70, 70, 70); */
  max-width: 200px;
  margin: 0 auto;
`;
const ColorDescriptor = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 150px;
  margin: 5px auto;

  div {
    width: 15px;
    height: 15px;
    border: 1px dashed black;
    margin-right: 10px;
    background: ${props => props.color};
  }

  h1 {
    color: white;
  }
`;
