import React, { Component } from "react";
import * as $ from "jquery";

import logo from "./spotifyLogo.svg";

import Button from "react-bootstrap/Button";

import { clientId, redirectUri, scopes, authEndpoint } from "./config";
import "./App.css";
import Playlist from "./Playlist";
import PlaylistTracks from "./PlaylistTracks";

import ListGroup from "react-bootstrap/ListGroup";

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      playlists: [
        {
          id: "",
          images: [{ url: "" }],
          name: "",
          tracks: [],
        },
      ],
      no_data: false,
      playlistChoosen: null,
    };

    this.getAllPlaylist = this.getAllPlaylist.bind(this);
    this.choosePlaylist = this.choosePlaylist.bind(this);
    //this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getAllPlaylist(_token);
    }

    // set interval for polling every 5 seconds
    //this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    this.setState(this.state, () => {
      this.state.playlists.pop();
    });
  }

  getAllPlaylist(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      /*
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
        },
      */
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          playlists: data.items,
        });
      },
    });
  }

  choosePlaylist(playlistC) {
    this.setState({ playlistChoosen: playlistC });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className="App-logo mt-4 mb-2"
            style={this.state.token && { height: "100px" }}
            alt="logo"
          />

          {!this.state.token && (
            <Button
              variant="success"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </Button>
          )}

          {this.state.token &&
            !this.state.no_data &&
            !this.state.playlistChoosen && (
              <ListGroup
                className="row mx-auto border border-success mt-2 mb-2"
                style={{ width: "70vw" }}
              >
                {this.state.playlists.map((playlist) => (
                  <Playlist
                    key={playlist.id}
                    playlist={playlist}
                    buttonOnClick={this.choosePlaylist}
                  ></Playlist>
                ))}
              </ListGroup>
            )}
          {/*TODO : Add return button*/}
          {this.state.playlistChoosen && (
            <PlaylistTracks
              playlist={this.state.playlistChoosen}
              token={this.state.token}
            ></PlaylistTracks>
          )}

          {this.state.no_data && <p>Vous n'avez aucune playlist</p>}
        </header>
      </div>
    );
  }
}

export default App;
