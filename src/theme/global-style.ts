import { createGlobalStyle } from "styled-components";
import { theme } from "./theme"

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-style: normal;
  }
  body {
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    background: ${theme.palette.background};
  }
`;
