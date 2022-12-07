import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: auto;
  min-width: 170px;
  position: relative;
  margin-top: 36px;
  width: 160px;
  height: 140px;
  border-radius:8px;
  background: ${(props) => props.color};

  img{
    width: 170px;
    position: absolute;
    margin-top: -70px;
  }

  & + & {
    margin-left: 8px;
  }
`;

export const Information = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  position: relative;
  overflow: hidden;

  .pokemonData{
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    margin: auto;
    margin-bottom: 40px;
    position: relative;
  }

  > img {
    opacity: 0.2;
    width: 90px;
    position: absolute;
    margin-top: 60px;
    margin-left: 80px;
  }
`;
