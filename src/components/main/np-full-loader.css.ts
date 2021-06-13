import { css } from 'lit';

export default css`
  :host {
    display: flex;
    height: 100vh;
  }

  #spinner {
    margin: auto;

    border: 6px solid #737373;
    border-radius: 50%;
    border-top: 6px solid #353535;
    width: 40px;
    height: 40px;

    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
