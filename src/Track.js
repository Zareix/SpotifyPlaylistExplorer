import React from "react"

import ListGroupItem from "react-bootstrap/ListGroupItem"
import Dropdown from "react-bootstrap/Dropdown"

import "./Track.css"
import BtnMoreInfoTrack from "./BtnMoreInfoTrack"

const Track = (props) => {
  const { track, genresSelected, selectGenre } = props
  // TODO : Animation
  if (!track.genres)
    return (
      <ListGroupItem className="border border-success bg-dark">
        <div className="d-flex justify-content-center">
          <div>
            {track.artists.map((artist) => {
              return (
                <span className="text-white fs-3" key={artist.id}>
                  {track.artists.length - 1 ===
                    track.artists.indexOf(artist) ? (
                    <span>{artist.name} </span>
                  ) : (
                    <span>{artist.name}, </span>
                  )}
                </span>
              )
            })}
            <span className="fw-bold text-white fs-3">- {track.name}</span>
          </div>
        </div>
      </ListGroupItem>
    )
  if (genresSelected.length === 0)
    return (
      <ListGroupItem className="border border-success bg-dark">
        <div className="d-flex justify-content-center">
          <div>
            {track.artists.map((artist) => {
              return (
                <span className="text-white fs-3" key={artist.id}>
                  {track.artists.length - 1 ===
                    track.artists.indexOf(artist) ? (
                    <span>{artist.name} </span>
                  ) : (
                    <span>{artist.name}, </span>
                  )}
                </span>
              )
            })}
            <span className="fw-bold text-white fs-3">- {track.name}</span>
          </div>
        </div>
        <div className="m-2">
          {track.genres && track.genres.length > 0 && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {track.genres.map((genre, i) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        selectGenre([genre])
                      }}
                      key={i}
                    >
                      {genre}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <BtnMoreInfoTrack track={track} />
      </ListGroupItem>
    )

  if (
    track.genres.some((genre) =>
      genresSelected.some((g) =>
        genre.toUpperCase().includes(g.toUpperCase())
      )
    ) ||
    track.genres.length === 0
  )
    return (
      <ListGroupItem className="border border-success bg-dark">
        <div className="d-flex justify-content-center">
          <div>
            {track.artists.map((artist) => {
              return (
                <span className="text-white fs-3" key={artist.id}>
                  {track.artists.length - 1 ===
                    track.artists.indexOf(artist) ? (
                    <span>{artist.name} </span>
                  ) : (
                    <span>{artist.name}, </span>
                  )}
                </span>
              )
            })}
            <span className="fw-bold text-white fs-3">- {track.name}</span>
          </div>
        </div>
        <div className="m-2">
          {track.genres && track.genres.length > 0 && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {track.genres.map((genre, i) => {
                  return (
                    <Dropdown.Item onClick={() => selectGenre([genre])} key={i}>
                      {genre}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <BtnMoreInfoTrack track={track}/>
      </ListGroupItem>
    )
  return null
}

export default Track
