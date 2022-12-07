import { createGlobalStyle } from 'styled-components';
import '@fontsource/sora';

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Sora;
  }

  body {
    background: #b1b1b1;
    color: #333;
    min-width: 1000px;
    width: 1200px;
    margin: auto;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    color: #333;
  }
`;
