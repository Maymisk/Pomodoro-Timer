import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    a { 
        text-decoration: none;
    }

    button { 
        cursor: pointer;
    }



    body, textarea, input, button {
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        font-weight: 400;
    } 

    @media (max-width: 1120px) {
        html {
            font-size: 93.75%;
        }
    }

    @media (max-width: 768px) {
        html {
            font-size: 87.5%;
        }
    }
`;
