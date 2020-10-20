import React from "react";
import styled from "styled-components";

const TheWord = (props) => {
  const{word} = props
  return (
    <Wrapper>
    {word.revealed.map((letter) => {
      return <Span line={!letter}>{letter}</Span>
    })}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  font-size: 20px;
  display: flex;
  margin: 0 auto;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "none")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

export default TheWord;
