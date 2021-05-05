import React, { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";

import Track from "./Track";
import Loading from "./Loading";

const axios = require('axios')

const electro = [
  "electro",
  "edm",
  "house",
  "dance",
  "room",
  "dubstep",
  "bass",
  "trap",
  "bounce",
  "brostep",
];
const latino = ["latino", "funk", "reggaeton", "hip hop tuga"];

const PlaylistTracks = (props) => {
  const { token, playlist } = props

  const [tracks, setTracks] = useState([])
  const [genresSelected, setGenresSelected] = useState([""])
  const [genresToSelect, setGenresToSelect] = useState([electro, latino])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setTracks(await axios
      .get(playlist.tracks.href, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(async (res) => {
        let _tracks = res.data.items
        let cpt = 0
        let cptD = 0

        while (cpt < _tracks.length) {
          cptD = cpt
          var requestLink = "https://api.spotify.com/v1/artists?ids=";
          do {
            if (_tracks[cpt].track)
              requestLink += _tracks[cpt].track.artists[0].id + ",";
            cpt++;
          } while (cpt < _tracks.length && cpt % 49 !== 0);
          requestLink = requestLink.slice(0, requestLink.length - 1);

          await axios.get(
            requestLink, {
            headers: { Authorization: `Bearer ${token}` }
          })
            .then((res) => {
              let tracksUpdated = _tracks;
              for (let i = cptD; i < cptD + res.data.artists.length; i++) {
                tracksUpdated[i].track.genres =
                  res.data.artists[i - cptD].genres;
              }
              _tracks = tracksUpdated
            });
        }
        return _tracks
      }));
    setLoading(false)
  }, [])

  const selectGenre = (genre) => {
    setGenresSelected(genre)
  };

  const handleChangeInput = ({ target: { value } }) => {
    setGenresSelected([value])
  };

  if (loading)
    return <Loading />

  return (
    <div>
      {genresSelected[0] !== "" ? (
        <div className="row">
          <div className="col-12 col-ld-6">
            <Button
              onClick={() => selectGenre([""])}
              className="mb-2"
              variant="danger"
            >
              Déselectionner le genre
              </Button>
          </div>
          <div className="col-12 col-sm-6">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Genre Choisi</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inputGenre"
                onChange={handleChangeInput}
                value={genresSelected[0]}
              />
            </InputGroup>
          </div>
        </div>
      ) : (
        <div className="row">
          <Dropdown className="mb-2 col-12 col-sm-6">
            <Dropdown.Toggle variant="success">
              Selectionner un genre
              </Dropdown.Toggle>
            <Dropdown.Menu>
              {genresToSelect.map((genre, index) => {
                return (
                  <Dropdown.Item
                    onClick={() => selectGenre(genre)}
                    key={index}
                  >
                    {genre[0]}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <div className="col-12 col-sm-6">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Genre Choisi</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={handleChangeInput}
                value={genresSelected[0]}
              />
            </InputGroup>
          </div>
        </div>
      )}
      <ListGroup>
        {tracks.map((track) => {
          if (track.track) {
            return (
              <Track
                key={track.track.id}
                track={track.track}
                genresSelected={genresSelected}
                selectGenre={selectGenre}
              ></Track>
            );
          }
          return null;
        })}
      </ListGroup>
    </div>
  );

}

export default PlaylistTracks;
