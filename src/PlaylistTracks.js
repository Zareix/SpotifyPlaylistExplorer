import React, { Component } from "react";

import * as $ from "jquery";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class PlaylistTracks extends Component {
  constructor(playlist, token) {
    super();
    this.state = {
      token: token,
      playlist: playlist,
      tracks: [
        {
          href: "",
          id: "",
          name: "",
          artists: [
            {
              id: "",
              name: "",
              genres: [],
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.getAllTracks();
  }

  getAllTracks() {
    this.state.tracks.map((track) => {
      $.ajax({
        url: "",
        type: "GET",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
        /*
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
           },
        */
        success: (data) => {
					//TODO : recup tout les tracks
					//TODO : recup le genre de chaque
				},
      });
    });
  }

  render() {
    return ( //TODO : finir affichage
      <ListGroup>
        {this.state.playlist.tracks.map((track) => {
          <ListGroupItem key={track.id}></ListGroupItem>;
        })}
      </ListGroup>
    );
  }
}

export default PlaylistTracks;
