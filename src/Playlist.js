import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";

const Playlist = ({ playlist, buttonOnClick }) => {
  return (
    <ListGroupItem className="border-success border-left-0 border-top-0 border-right-0 bg-dark">
      <div className="row align-items-center justify-content-start">
        <img className="col-3" src={playlist.images[0].url}></img>
        <div className="row justify-content-center col-9">
          <h3 className="col-12 mb-4">{playlist.name}</h3>
          <Button variant="success" onClick={() => buttonOnClick(playlist)}>
            Choisir
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default Playlist;
