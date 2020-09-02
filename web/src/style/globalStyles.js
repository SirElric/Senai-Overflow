import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    :root {
        --primary: #111;
        --secundary: rgb(25,25,25);
        --white: #d9d9d9;
        --gray: #7a7a7a;
        --red: #aa0000;
        --alertErro: rgb(255,0,0,0.8);
        --alertSucesso: rgb(0,255,0,0.8);
    }

    *{
        margin: 0;
        padding: 0;
        outline: 0;
    }

    body {
        font-family: Arial;
        background-color: var(--primary);

        overflow-x: hidden;
    }

    input {
        color: var(--white);
        background-color: var(--secundary);
        font-size: 16px;
        border: 1px solid var(--white);
        padding: 10px;
        font-weight: bold;
        height: 30px;

        transition: background-color 0.2s;
    }

    textarea {
        color: var(--white);
        background-color: var(--secundary);
        font-size: 16px;
        border: 1px solid var(--white);
        padding: 10px;
        font-weight: bold;
        height: 30px;

        transition: background-color 0.2s;

        resize: none;
    }

    label {
        color: var(--white);
        letter-spacing: 2px;
        
        font-size: 20px;

    }

    input, button, textarea{
        :hover{
            background-color: var(--red);
        }
    }

    button {
        padding: 10px;

        font-family: Arial;
        font-size: 18px;
        letter-spacing: 1px;

        color: var(--white);
        background-color: var(--primary);
        border: 1px solid var(--white);

        cursor: pointer;

        transition: background-color 0.2s;

        :active{
            color: var(--gray);
            border: 1px solid var(--gray);
        }

    }
    
`; 