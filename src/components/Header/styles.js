import ReactSelect from 'react-select';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  padding: 16px 30px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50px;

  button {
    padding: 8px 24px;
    border: none;
    border-radius: 20px;
    background: #498899;
    color: #fff;
  }

`;

export const SelectContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;

`;

export const Select = styled(ReactSelect)`
  width: 200px;
  height: 36px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  display: flex;

  & + & {
    margin-left: 8px;
  }
`;
