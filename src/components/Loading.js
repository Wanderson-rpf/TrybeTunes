import React from 'react';
import '../style/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="container-loading">
        <div className="equalizer">
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
          <div className="equalizer-bar" />
        </div>
        <p className="text-loading">Loading</p>
      </div>
    );
  }
}

export default Loading;
