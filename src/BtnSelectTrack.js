import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-modal";

const BtnSelectTrack = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button onClick={openModal}>Plus d'info</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          {props.track.album.images[0] && (
              <img src={props.track.album.images[0].url} width={300} className="mb-2"/>
          )}
        <h1>{props.track.name}</h1>
        <h3> - {props.track.artists[0].name}</h3>
        <div className="mt-3 mb-3">
            <h5 className="mb-0">Album :<br></br></h5>
            <span className="ms-3">Type :  {props.track.album.album_type}<br></br></span>
            <span className="ms-3">Nom : {props.track.album.name}<br></br></span>
            <span className="ms-3">Date de sortie : {props.track.album.release_date}<br></br></span>
        </div>
        <a href={props.track.external_urls.spotify}>Lien sur Spotify</a>
        
      </Modal>
    </div>
  );
};

export default BtnSelectTrack;
