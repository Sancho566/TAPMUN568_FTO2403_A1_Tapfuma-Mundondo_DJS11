//components/ToggleButton.js
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonText};
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

const ToggleButton = ({ toggleTheme, theme }) => {
  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </Button>
  );
};

export default ToggleButton;
