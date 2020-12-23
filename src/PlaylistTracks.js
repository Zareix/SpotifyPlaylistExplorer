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
    };
    this.getAllTracks = this.getAllTracks.bind(this);
  }

  componentDidMount() {
    this.getAllTracks().then(() => {
      this.getAllGenres();
    });
  }

  async getAllTracks() {
    await $.ajax({
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

  getAllGenres() {
    var requestLink = "https://api.spotify.com/v1/artists?ids=";
    requestLink += this.state.tracks[0].track.artists[0].id;
    for (let i = 1; i < this.state.tracks.length; i++) {
      requestLink += "," + this.state.tracks[i].track.artists[0].id;
    }
    console.log(requestLink);
    $.ajax({
      url: requestLink,
      type: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
      success: (data) => {
        var tracksUpdated = this.state.tracks;
        for (let i = 0; i < data.artists.length; i++) {
          tracksUpdated[i].track.genres = data.artists[i].genres;
        }
        this.setState({
          tracks: tracksUpdated,
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
              return <Track track={track.track}></Track>;
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
