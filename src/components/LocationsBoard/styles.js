import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  width: 1032px;
  height: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Home = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 400px;
  }

  span {
    max-width: 670px;
    font-size: 24px;
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
  }
`;
