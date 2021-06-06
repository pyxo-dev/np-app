import { css } from 'lit';

export default css`
  np-header {
    min-height: var(--swc-header-height);
    border-bottom: 1px solid var(--spectrum-global-color-gray-200);
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--spectrum-global-color-gray-50);
    top: 0px;
    right: 0px;
    left: 0px;
    padding-left: 8px;
    z-index: 10;
  }

  sp-progress-bar {
    --spectrum-progressbar-height: 1px;
    --spectrum-progressbar-width: 100vw;
    --spectrum-progressbar-m-indeterminate-duration: 4s;
    position: fixed;
    z-index: 20;
  }

  @media screen and (min-width: 961px) {
    #side-nav-toggle {
      display: none;
    }
  }

  #body {
    position: relative;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    height: calc(100% - var(--spectrum-global-dimension-size-600) - 1px);
    color: var(--spectrum-global-color-gray-800);
  }

  np-aside {
    display: flex;
    flex: 0 0 auto;
    box-sizing: border-box;
  }

  np-main {
    background-color: var(--spectrum-global-color-gray-50);
    position: relative;
    max-height: calc(100vh - var(--swc-header-height) - 1px);
    width: 100%;
    overflow: auto;
  }

  np-footer {
    background-color: var(--spectrum-global-color-gray-50);
    color: var(--spectrum-global-color-gray-800);
  }
`;
