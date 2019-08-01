import React from "react";
import styled from "styled-components";
import descriptions from "../../content/descriptions";

export default class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  changeSelection = index => {
    this.setState({
      selected: index
    });
  };

  render() {
    let selected = descriptions[this.state.selected];

    return (
      <Descriptor>
        {descriptions.map((desc, indx) => (
          <button onClick={() => this.changeSelection(indx)}>
            {desc.title}
          </button>
        ))}
        <h1>{selected.title}</h1>
        {selected.paragraphs.map(para => (
          <p>{para}</p>
        ))}
        <p>
          {selected.rules ? selected.rules.title : null}
          <ul>
            {selected.rules
              ? selected.rules.paragraphs.map(rule => (
                  <li>
                    <span>{rule}</span>
                  </li>
                ))
              : null}
          </ul>
        </p>
      </Descriptor>
    );
  }
}

const Descriptor = styled.section`
  color: white;
  max-width: 600px;
  /* width: 40%; */
  line-height: 18px;

  p {
    text-align: left;
    text-indent: 40px;
    margin: 15px 0;
  }

  ul {
    max-width: 80%;
    list-style-type: circle;
    margin: 10px auto;

    li {
      list-style-position: outside;
      text-indent: 0;
      margin: 5px 0;
    }
    span {
      position: relative;
    }
  }
`;
