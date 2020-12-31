import Head from 'next/head';
import React from 'react';
import { Player, ControlBar } from 'video-react';
import PropTypes from 'prop-types';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.replay = this.replay.bind(this);
  }

  replay() {
    const { player } = this.player.getState();
    if (player.ended) {
      this.player.play();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Head>
          <link rel="icon" type="image/jpg" href="/spacexlogo.jpg" />
        </Head>
        <div id="layoutVideo">
          <Player
            onEnded={this.replay}
            ref={(player) => {
              this.player = player;
            }}
            autoPlay
            fluid
            muted
          >
            <source src="/video/SpaceX.mp4" />

            <ControlBar disabled />
          </Player>
        </div>
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element,
    PropTypes.arrayOf(PropTypes.object)]).isRequired,
};
