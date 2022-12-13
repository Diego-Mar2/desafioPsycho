import Select from 'react-select';
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

    :hover {
      background: #3b6e8c;
    }

    :disabled {
      background: #b1b1b1;
      cursor: default;
    }
  }

`;

export const SelectContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;

`;

export const CustomSelect = styled(Select)`
  .Select__control {
    width: 280px;
    height: 100%;
    border-radius: 8px;
    cursor: pointer;
  }

  .Select__control:hover {
    border-color: #498899;
  }

  .Select__value-container {
    display: flex;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    color: #498899;
  }

  & + & {
    margin-left: 18px;
  }

`;
