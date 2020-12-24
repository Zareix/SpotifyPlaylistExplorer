import React from "react";

import * as $ from "jquery";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import Track from "./Track";

class PlaylistTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      genreSelected: "",
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
    var cpt = 0;
    while (cpt < this.state.tracks.length) {
      var depart = cpt;
      var requestLink = "https://api.spotify.com/v1/artists?ids=";
      do {
        requestLink += this.state.tracks[cpt].track.artists[0].id + ",";
        cpt++;
      } while (cpt < this.state.tracks.length && cpt % 49 !== 0);
      requestLink = requestLink.slice(0, requestLink.length - 1);

      $.ajax({
        async: false,
        url: requestLink,
        type: "GET",
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
        success: (data) => {
          var tracksUpdated = this.state.tracks;
          for (let i = depart; i < depart + data.artists.length; i++) {
            tracksUpdated[i].track.genres = data.artists[i - depart].genres;
          }
          this.setState({
            tracks: tracksUpdated,
          });
        },
      });
    }
  }

  selectGenre = (genre) => {
    this.setState({
      genreSelected: genre,
    });
  };

  // TODO : Loading
  render() {
    return (
      <div>
        {this.state.genreSelected !== "" && (
          <div>
            <Button
              onClick={() => this.selectGenre("")}
              className="mb-2"
              variant="danger"
            >
              Deselect Genre
            </Button>
            <p> Genre choisi : {this.state.genreSelected}</p>
          </div>
        )}
        <ListGroup>
          {this.state.tracks.map((track) => {
            if (track.track) {
              return (
                <Track
                  key={track.track.id}
                  track={track.track}
                  genreSelected={this.state.genreSelected}
                  selectGenre={this.selectGenre}
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

export default PlaylistTracks;
