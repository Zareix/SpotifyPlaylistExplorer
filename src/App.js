import React, { Component } from "react";
import * as $ from "jquery";
import logo from "./logo.svg";
import { clientId, redirectUri, scopes, authEndpoint } from "./config"
import "./App.css";
import Playlist from "./Playlist";

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
      playlists: [{
        id: "",
        images: [{ url: "" }],
        name: ""
      }],
      no_data: false,
    };

    this.getAllPlaylist = this.getAllPlaylist.bind(this);
    //this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getAllPlaylist(_token);
    }

    // set interval for polling every 5 seconds
    //this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  getAllPlaylist(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if (!data) {
          this.setState({
            no_data: true
          })
          return
        }
        this.setState({
          playlists: data.items
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && !this.state.no_data && (
            <div class="row">
              <div class="col-md-4">
                {this.state.playlists.map((playlist) => (
                  <Playlist playlist={playlist}></Playlist>
                ))}
              </div>
            </div>
          )
          }
          {this.state.no_data && (
            <p>
              Vous n'avez aucune playlist
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default App;