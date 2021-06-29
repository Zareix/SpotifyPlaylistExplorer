import React from "react"
import { Button, ListGroupItem } from "react-bootstrap"

const Playlist = ({ playlist, buttonOnClick }) => {
  return (
    <ListGroupItem
      className="shadow bg-dark border-full-dark py-4"
      key={playlist.id}
    >
      <div className="row align-items-center justify-content-center">
        <img
          className="col-4"
          src={playlist.images[0].url}
          alt={`img-${playlist.name}`}
        ></img>
        <div className="col-8">
          <h3 className="text-white">{playlist.name}</h3>
          <Button
            variant="success mt-2"
            onClick={() => buttonOnClick(playlist)}
          >
            Choisir
          </Button>
        </div>
      </div>
    </ListGroupItem>
  )
}

export default Playlist
