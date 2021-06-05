import { css } from 'lit';

export default css`
  :host {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
  }

  #theme-loader {
    background-color: #fff;
  }
  :host([color='dark']) #theme-loader {
    background-color: #252525;
  }
  :host([color='darkest']) #theme-loader {
    background-color: #000;
  }

  sp-theme {
    --swc-header-height: var(--spectrum-global-dimension-size-600);
  }

  #app {
    width: 100%;
    height: 100%;
  }

  np-layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #theme-manager {
    margin-inline-start: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  #theme-loader {
    display: flex;
    width: 100%;
    height: 100%;
  }

  #theme-loader #spinner {
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
