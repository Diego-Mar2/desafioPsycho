import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 180px;
  position: relative;
  margin: 28px 8px;
  margin-bottom: 8px;
  height: 140px;
  border-radius:8px;
  background: ${(props) => props.color};

  img{
    width: 100%;
    position: absolute;
    margin-top: -70px;
  }
`;

export const Information = styled.div`
  display: flex;
  width: 100%;
  font-size: 18px;
  position: relative;
  overflow: hidden;

  .pokemonData{
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    margin: auto;
    margin-bottom: 36px;
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
