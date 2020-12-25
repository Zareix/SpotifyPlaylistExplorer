import React from "react";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Dropdown from "react-bootstrap/Dropdown";

import "./Track.css";

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
      </ListGroupItem>
    );
  var response = props.track.genres.map((genre) => {
    var rep = props.genresSelected.map((g) => {
      if (genre.includes(g)) return true;
    });
    return rep.includes(true);
  });
  if (response.includes(true) || props.track.genres.length === 0)
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
                    <Dropdown.Item onClick={() => props.selectGenre(genre)}>
                      {genre}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </ListGroupItem>
    );
  return null;
};

export default Track;
