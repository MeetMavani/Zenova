import React from 'react';
import './HomeScrollAnimation.css';

const HomeScrollAnimation = () => {
  return (
    <div className="text-mask-container">
      <video
        src="/1675100908-1675100908-chill-time.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="masked-video"
      />
      <div className="text-overlay">
        <h1>HOME</h1>
      </div>
    </div>
  );
};

export default HomeScrollAnimation;
