import React from "react";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Dropdown from "react-bootstrap/Dropdown";

import "./Track.css";

const Track = ({ track }) => {
  return (
    <ListGroupItem className="border border-success bg-dark" key={track.id}>
      <div className="d-flex justify-content-center">
        <div>{track.artists[0].name}</div>
        <div class="fw-bold">&nbsp;- {track.name}</div>
      </div>
      <div>
        {track.genres && track.genres.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Genres
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {track.genres.map((genre) => {
                return <Dropdown.Item>{genre}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </ListGroupItem>
  );
};

export default Track;
