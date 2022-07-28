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

    body { 
        background: ${props => props.theme['gray-900']};
        
        color: ${props => props.theme['gray-300']}
    }

    body, textarea, input, button {
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        font-weight: 400;
    } 

    :focus {
        outline: 0;

        box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
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
