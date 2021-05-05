import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";

const Playlist = ({ playlist, buttonOnClick }) => {
  return (
    <ListGroupItem className="border-success bg-dark" key={playlist.id}>
      <div className="row align-items-center justify-content-center">
        <img
          className="col-sm-3 col-6 mb-2 mb-sm-0"
          src={playlist.images[0].url}
          alt={`img-${playlist.name}`}
        ></img>
        <div className="row justify-content-center col-9">
          <h3 className="col-12 mb-sm-2 text-white">{playlist.name}</h3>
          <Button
            variant="success col-sm-3 col-5"
            onClick={() => buttonOnClick(playlist)}
          >
            Choisir
                </Button>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default Playlist;
