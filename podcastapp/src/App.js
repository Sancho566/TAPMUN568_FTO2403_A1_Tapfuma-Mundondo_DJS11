import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lightTheme, darkTheme } from './components/tempStyles/themes';
import ToggleButton from './components/ToggleButton';
import ShowList from './components/ShowList';
import Favorites from './components/FavoritesView';
import AudioPlayer from './components/AudioPlayer';  
import LandingPage from './components/LandingPage'; 
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faMoon, faSun, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Header = styled.header`
  background-color: ${({ theme }) => theme.headerBackground || '#282c34'};
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground || '#282c34'};
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text || '#ffffff'};
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
`;

const HeaderTitle = styled.h1`
  color: ${({ theme }) => theme.text || '#ffffff'};
  margin-bottom: 20px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text || '#ffffff'};
  text-decoration: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.text || '#ffffff'};
  font-size: 1.5rem;
  margin: 0 10px;

  &:hover {
    color: ${({ theme }) => theme.textHover || '#ddd'};
  }
`;

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing
  const audioRef = useRef(null); // Reference to the audio player

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  const handleAudioPause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault();
        event.returnValue = ''; // This triggers the confirmation dialog
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <Header>
          <HeaderTitle>Podcast & Chill</HeaderTitle>
          <Nav>
            <NavLink href="/shows">
              <FontAwesomeIcon icon={faHome} />
              Shows
            </NavLink>
            <NavLink href="/favorites">
              <FontAwesomeIcon icon={faHeart} />
              Favorites
            </NavLink>
          </Nav>
          <ToggleButton toggleTheme={toggleTheme} theme={theme} />
          <FontAwesomeIcon 
            icon={theme === 'light' ? faMoon : faSun} 
            style={{ cursor: 'pointer', fontSize: '1.5rem' }} 
            onClick={toggleTheme}
          />
        </Header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shows" element={<ShowList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <AudioPlayer
          ref={audioRef}
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
        />
        <Footer>
          <div>
            <IconLink href="mailto:tapfumamundondo@gmail.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} />
            </IconLink>
          </div>
          <p>© 2024 Podcast & Chill App. All rights reserved.</p>
        </Footer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
