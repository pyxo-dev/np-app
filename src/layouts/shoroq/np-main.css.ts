import { css } from 'lit';

export default css`
  #page {
    padding: 40px 52px 24px 52px;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 768px) {
    #page {
      padding: 40px 16px 24px 16px;
    }
  }
`;
