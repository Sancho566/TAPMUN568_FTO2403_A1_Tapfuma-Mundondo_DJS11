import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/tempStyles/themes';
import GlobalStyle from './components/tempStyles/GlobalStyle';

const Root = () => {
  const [theme, setTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <App theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
};

// Use React 18's createRoot API
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);
