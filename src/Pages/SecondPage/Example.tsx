import React from 'react';
import YouTube from 'react-youtube';

export class Example extends React.Component {
  render() {
    const opts:any = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />;
  }

  _onReady(event: any) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}