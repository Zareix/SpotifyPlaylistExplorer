import React from "react";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Dropdown from "react-bootstrap/Dropdown";

import "./Track.css";
import BtnMoreInfoTrack from "./BtnMoreInfoTrack";

const Track = (props) => {
  // TODO : Animation
  if (!props.track.genres)
    return (
      <ListGroupItem className="border border-success bg-dark">
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
      </ListGroupItem>
    );
  if (props.genresSelected.length === 0)
    return (
      <ListGroupItem className="border border-success bg-dark">
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
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        props.selectGenre([genre]);
                      }}
                    >
                      {genre}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <BtnMoreInfoTrack track={props.track} />
      </ListGroupItem>
    );

  if (
    props.track.genres.some((genre) =>
      props.genresSelected.some((g) => genre.includes(g))
    ) ||
    props.track.genres.length === 0
  )
    return (
      <ListGroupItem className="border border-success bg-dark">
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
                  return (
                    <Dropdown.Item onClick={() => props.selectGenre([genre])}>
                      {genre}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <BtnMoreInfoTrack track={props.track} />
      </ListGroupItem>
    );
  return null;
};

export default Track;
