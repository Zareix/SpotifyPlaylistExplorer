import React from "react";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Dropdown from "react-bootstrap/Dropdown";

import "./Track.css";

const Track = (props) => {
  // TODO : Animation
  return (
    <ListGroupItem
      className="border border-success bg-dark"
    >
      <div className="d-flex justify-content-center">
        <div>
          {props.track.artists.map((artist) => {
            return (
              <span>
                {props.track.artists.length - 1 ===
                props.track.artists.indexOf(artist) ? (
                  <span>{artist.name} </span>
                ) : (
                  <span>{artist.name}, </span>
                )}
              </span>
            );
          })}
          <span class="fw-bold">- {props.track.name}</span>
        </div>
      </div>
      <div>
        {props.track.genres && props.track.genres.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Genres
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.track.genres.map((genre) => {
                return <Dropdown.Item>{genre}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </ListGroupItem>
  );
}

export default Track;
