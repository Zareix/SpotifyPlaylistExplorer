import React, { useState, useContext } from "react"

import axios from "axios"
import { Button } from "react-bootstrap"
import { TokenContext } from "./Context"

const AddToQueueBtn = ({ trackUri, className }) => {
  const { token } = useContext(TokenContext)

  const [added, setAdded] = useState(false)
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const addToQueue = () => {
    setIsLoading(true)
    axios
      .post(
        "https://api.spotify.com/v1/me/player/queue?uri=" + trackUri,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setAdded(true)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error.response)
        setIsLoading(false)
      })
  }

  const buttonText = () => {
    if (isLoading) return "Ajout..."
    if (added) return "Ajouté !"
    return "Ajouter à la file d'attente"
  }

  const buttonErrorText = () => {
    if (error.status === 404) return "Aucun appareil en lecture"
    if (error.status === 403) return "Vous n'êtes pas Spotify prenium"
    return "Une erreur est survenue"
  }

  return (
    <Button
      disabled={isLoading || added || error}
      onClick={!isLoading ? addToQueue : null}
      variant={error ? "danger" : added ? "success" : "primary"}
      className={className || ""}
    >
      {error ? buttonErrorText() : buttonText()}
    </Button>
  )
}

export default AddToQueueBtn
