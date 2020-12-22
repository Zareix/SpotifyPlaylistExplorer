import React from "react";
import PropTypes from "prop-types";

import * as $ from "jquery";

import ListGroup from "react-bootstrap/ListGroup";

import Track from "./Track";

class PlaylistTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      loaded: false,
    };
    this.getAllTracks = this.getAllTracks.bind(this);
  }

  componentDidMount() {
    this.getAllTracks();
  }

  getAllTracks() {
    $.ajax({
      url: this.props.playlist.tracks.href,
      type: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
      success: (data) => {
        this.setState({
          tracks: data.items,
        });
      },
    });
  }

  // TODO : Loading
  render() {
    return (
      <div>
        <ListGroup>
          {this.state.tracks.map((track) => {
            if (track.track) {
              return (
                <Track
                  track={track.track}
                  token={this.props.token}
                  key={track.track.id}
                ></Track>
              );
            }
            return null;
          })}
        </ListGroup>
      </div>
    );
  }
}

PlaylistTracks.propTypes = {
  playlist: {
    tracks: {
      href: PropTypes.string,
    },
  },
  token: PropTypes.string,
};

export default PlaylistTracks;
