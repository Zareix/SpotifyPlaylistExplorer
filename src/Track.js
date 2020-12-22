import React, { useState, useEffect } from "react";

import * as $ from "jquery";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Dropdown from "react-bootstrap/Dropdown";

import { useSpring, animated, config } from "react-spring";

import "./Track.css";

const Track = ({ track, token }) => {
  const [genres, setGenres] = useState();
  const [genresIsInited, genresInit] = useState(false);

  const spring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.gentle
  });

  const AnimatedItem = animated(ListGroupItem);

  useEffect(() => {
    if (!genresIsInited) {
      $.ajax({
        url: track.artists[0].href,
        type: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: (data) => {
          setGenres(data.genres);
          genresInit(true);
        },
      });
    }
  });

  // TODO : Animation
  return (
    <div>
      {genresIsInited && (
        <animated.div style={spring}>
          <ListGroupItem className="border border-success bg-dark">
            <div className="d-flex justify-content-center">
              <div>{track.artists[0].name}</div>
              <div class="fw-bold">&nbsp;- {track.name}</div>
            </div>
            <div>
              {genres && genres.length > 0 && (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Genres
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {genres.map((genre) => {
                      return <Dropdown.Item>{genre}</Dropdown.Item>;
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </ListGroupItem>
        </animated.div>
      )}
    </div>
  );
};

export default Track;
