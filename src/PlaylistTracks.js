import React from "react";
import PropTypes from "prop-types";

import * as $ from "jquery";

import ListGroup from "react-bootstrap/ListGroup";
import { Spring } from "react-spring/renderprops";

import Track from "./Track";

class PlaylistTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    this.getAllTracks = this.getAllTracks.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
  }

  componentDidMount() {
    this.getAllTracks().then(() => this.getAllCategories());
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

  getAllCategories() {
    var newTracks = this.state.tracks;
    newTracks.map((track) => {
      track.track.genres = this.getGenres(track.track.artists[0]);
    });
    this.setState({
      tracks: newTracks,
    });
  }

  getGenres(artist) {
    return $.ajax({
      async: false,
      url: artist.href,
      type: "GET",
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    }).responseJSON.genres;
  }

  // TODO : ListGroupItem -> Track component
  render() {
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => (
          <ListGroup style={props}>
            {this.state.tracks.map((track) => {
              if (track.track) {
                return <Track track={track.track}></Track>;
              }
              return null;
            })}
          </ListGroup>
        )}
      </Spring>
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
