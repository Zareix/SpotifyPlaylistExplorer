import React from "react";

import ListGroupItem from "react-bootstrap/ListGroupItem";

import "./Track.css";

const Track = ({ track }) => {
  return (
    <ListGroupItem className="border border-success bg-dark" key={track.id}>
      <div className="d-flex justify-content-center">
        <div>{track.artists[0].name}</div>
        <div class="fw-bold">&nbsp;- {track.name}</div>
      </div>
    </ListGroupItem>
  );
};

export default Track;
