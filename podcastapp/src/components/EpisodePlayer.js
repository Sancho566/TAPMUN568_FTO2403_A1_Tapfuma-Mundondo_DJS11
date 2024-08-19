//components/EpisodePlayer.js
import React from 'react';

const EpisodePlayer = ({ episode }) => {
  return (
    <div className="episode-player">
      <h3>{episode.title}</h3>
      <audio controls>
        <source src={episode.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default EpisodePlayer;
