//App.js
import React, { useState, } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './components/tempStyles/GlobalStyle';
import { lightTheme, darkTheme } from './components/tempStyles/themes';
import ToggleButton from './components/ToggleButton';
import ShowList from './components/ShowList';
import styled from 'styled-components';

const Header = styled.header`
  background-color: ${({ theme }) => theme.headerBackground};
  padding: 10px;
  text-align: center;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground};
  padding: 10px;
  text-align: center;
`;

function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header>
        <h1>Podcast Shows</h1>
        <ToggleButton toggleTheme={toggleTheme} theme={theme} />
      </Header>
      <ShowList />
      <Footer>
        <p>© 2024 Podcast App</p>
      </Footer>
    </ThemeProvider>
  );
}

export default App;
