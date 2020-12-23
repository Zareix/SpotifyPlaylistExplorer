import React from "react";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Dropdown from "react-bootstrap/Dropdown";

import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track : props.track
    }
    console.log(this.state.track)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ track: nextProps.track });
  }

  // TODO : Animation
  render() {
    return (
      <ListGroupItem className="border border-success bg-dark" key={this.state.track.id}>
        <div className="d-flex justify-content-center">
          <div>
            {this.state.track.artists.map((artist) => {
              return (
                <span>
                  {this.state.track.artists.length - 1 ===
                  this.state.track.artists.indexOf(artist) ? (
                    <span>{artist.name} </span>
                  ) : (
                    <span>{artist.name}, </span>
                  )}
                </span>
              );
            })}
            <span class="fw-bold">- {this.state.track.name}</span>
          </div>
        </div>
        <div>
          {this.state.track.genres && this.state.track.genres.length > 0 && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.state.track.genres.map((genre) => {
                  return <Dropdown.Item>{genre}</Dropdown.Item>;
                })}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </ListGroupItem>
    );
  }
}

export default Track;
