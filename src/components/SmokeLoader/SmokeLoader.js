import React from 'react';
import './SmokeLoader.css';

const SmokeLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="smoke-loader">
        <div className="smoke-particle"></div>
        <div className="smoke-particle"></div>
        <div className="smoke-particle"></div>
        <div className="logo-text">Smokzy</div>
      </div>
    </div>
  );
};

export default SmokeLoader;