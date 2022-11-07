import styled from "styled-components";

import { red, grey } from "@mui/material/colors";

const LoginStyle = styled.main`
  .section-login {
    /* padding: 1.6rem 3.2rem; */
    /* background-color: red; */

    min-height: 100vh;

    display: grid;

    justify-content: center;
    align-content: center;
  }

  .login__form {
    /* background-color: ${grey[100]}; */
    background-color: #fff;

    border-radius: 8px;

    box-shadow: var(--box-shadow-1);

    padding: 4.4rem 6.4rem;

    max-width: 80rem;

    min-height: 40rem;

    display: grid;

    gap: 2rem 0;
  }
`;

export default LoginStyle;
