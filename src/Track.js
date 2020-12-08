import React from "react";

import ListGroupItem from "react-bootstrap/ListGroupItem";

import "./Track.css";

const Track = ({ track }) => {
  return (
    <ListGroupItem className=" border border-success bg-dark" key={track.id}>
      {track.name}
    </ListGroupItem>
  );
};

export default Track;
