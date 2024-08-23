// AudioPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.footerBackground || '#282c34'};
  color: ${({ theme }) => theme.text || '#ffffff'};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
`;

const ProgressBar = styled.input`
  flex: 1;
  margin: 0 10px;
  cursor: pointer;
`;

const TimeDisplay = styled.span`
  margin: 0 10px;
`;

const LoadingIndicator = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
  margin: 0 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text || '#ffffff'};
`;

const VolumeControl = styled.input`
  width: 100px;
  margin-left: 20px;
`;

const AudioPlayer = ({ episodeTitle, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1); // Volume control state
  const audioRef = useRef(null);

  useEffect(() => {
    const savedTime = localStorage.getItem('audioCurrentTime');
    if (savedTime) {
      audioRef.current.currentTime = parseFloat(savedTime);
      setCurrentTime(parseFloat(savedTime));
    }

    const savedIsPlaying = localStorage.getItem('audioIsPlaying');
    if (savedIsPlaying === 'true') {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('audioCurrentTime', currentTime);
    localStorage.setItem('audioIsPlaying', isPlaying);
  }, [currentTime, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [audioRef.current?.duration]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const updatePlaybackProgress = () => {
    setPlaybackProgress((audioRef.current.currentTime / duration) * 100);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <PlayerContainer>
      <div>
        <strong>{episodeTitle}</strong>
      </div>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <TimeDisplay>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`}</TimeDisplay>
      <ProgressBar
        type="range"
        min="0"
        max="100"
        value={playbackProgress}
        onChange={handleProgressChange}
      />
      <TimeDisplay>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}</TimeDisplay>
      <VolumeControl
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        title="Volume"
      />
      <LoadingIndicator isLoading={isLoading}>
        Loading...
      </LoadingIndicator>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={updatePlaybackProgress}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onEnded={() => setIsPlaying(false)}
      />
    </PlayerContainer>
  );
};

export default AudioPlayer;
