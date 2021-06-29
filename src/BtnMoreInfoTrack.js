import React from "react"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import AddToQueueBtn from "./AddToQueueBtn"

const BtnMoreInfoTrack = ({ track, className }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div key={track.id} className={className}>
      <Button onClick={openModal}>Plus d'info</Button>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        centered
        className="blur"
        backdropClassName="dimmed"
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton closeVariant="white"></Modal.Header>
        <Modal.Body className="text-center modal-border border-full-dark">
          {track.album.images[0] && (
            <img
              src={track.album.images[0].url}
              width={300}
              className="mb-2"
              alt={`album-img-${track.album.name}`}
            />
          )}
          <h1>{track.name}</h1>
          <h3>
            {track.artists.map((artist, i) => {
              return (
                <span key={i}>
                  {track.artists.length - 1 ===
                  track.artists.indexOf(artist) ? (
                    <span>{artist.name} </span>
                  ) : (
                    <span>{artist.name}, </span>
                  )}
                </span>
              )
            })}
          </h3>
          <div className="mt-3 mb-3 ms-5 text-start">
            <h5 className="mb-1">Album :</h5>
            <p className="ms-2 mb-1">
              Type :{" "}
              <span className="fst-italic">{track.album.album_type}</span>
            </p>
            <p className="ms-2 mb-1">
              Nom : <span className="fst-italic">{track.album.name}</span>
            </p>
            <p className="ms-2 mb-1">
              Date de sortie :{" "}
              <span className="fst-italic">{track.album.release_date}</span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-full-dark">
          <AddToQueueBtn trackUri={track.uri} />
          <Button
            variant="success"
            target="_blank"
            href={track.external_urls.spotify}
          >
            Voir sur Spotify
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BtnMoreInfoTrack
