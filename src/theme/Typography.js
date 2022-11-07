import React from "react";
import styled from "styled-components";

const HeadingPrimary = styled.h1`
  font-weight: ${(props) => props.inputWeight || "700"};
  letter-spacing: ${(props) => props.inputSpace || "0.2rem"};
  font-size: ${(props) => props.inputSize || "2.4rem"};
  color: ${(props) => props.inputColor || "var(--color-grey)"};
`;

const DefaultParagraph = styled.p`
  font-weight: ${(props) => props.inputWeight || "300"};
  letter-spacing: ${(props) => props.inputSpace || "0.1rem"};
  font-size: ${(props) => props.inputSize || "1.6rem"};
  color: ${(props) => props.inputColor || "var(--color-grey)"};
`;

export { HeadingPrimary, DefaultParagraph };
