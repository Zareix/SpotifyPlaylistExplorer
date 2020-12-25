import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";

const Playlist = ({ playlist, buttonOnClick }) => {
  return (
    <Spring
      from={{opacity : 0}}
      to={{opacity : 1}}
    >
      {(props) => {
        return (
          <ListGroupItem className="border-success bg-dark" style={props}>
            <div className="row align-items-center justify-content-start">
              <img className="col-3" src={playlist.images[0].url} alt={`img-${playlist.name}`}></img>
              <div className="row justify-content-center col-9">
                <h3 className="col-12 mb-4">{playlist.name}</h3>
                <Button
                  variant="success col-3"
                  onClick={() => buttonOnClick(playlist)}
                >
                  Choisir
                </Button>
              </div>
            </div>
          </ListGroupItem>
        );
      }}
    </Spring>
  );
};

export default Playlist;
