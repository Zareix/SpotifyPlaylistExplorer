import React from "react"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
//import Modal from "react-modal";

const BtnMoreInfoTrack = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div key={props.track.id}>
      <Button onClick={openModal}>Plus d'info</Button>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        centered
        className="blur"
        backdropClassName="dimmed"
        contentClassName="bg-dark text-white"
      >
        <Modal.Body className="text-center">
          {props.track.album.images[0] && (
            <img
              src={props.track.album.images[0].url}
              width={300}
              className="mb-2"
              alt={`album-img-${props.track.album.name}`}
            />
          )}
          <h1>{props.track.name}</h1>
          <h3>
            {props.track.artists.map((artist, i) => {
              return (
                <span key={i}>
                  {props.track.artists.length - 1 ===
                  props.track.artists.indexOf(artist) ? (
                    <span>{artist.name} </span>
                  ) : (
                    <span>{artist.name}, </span>
                  )}
                </span>
              )
            })}
          </h3>
          <div className="mt-3 mb-3 ms-5 text-start">
            <h5 className="mb-0">
              Album :<br></br>
            </h5>
            <span className="ms-2">
              Type : {props.track.album.album_type}
              <br></br>
            </span>
            <span className="ms-2">
              Nom : {props.track.album.name}
              <br></br>
            </span>
            <span className="ms-2">
              Date de sortie : {props.track.album.release_date}
              <br></br>
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-full-dark ms-5">
          <Button
            variant="success"
            target="_blank"
            href={props.track.external_urls.spotify}
          >
            Voir sur Spotify
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BtnMoreInfoTrack
