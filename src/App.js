import React, { useEffect, useState, useContext } from "react"

import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import { clientId, redirectUri, scopes, authEndpoint } from "./config"
import "./App.css"
import Playlist from "./Playlist"
import PlaylistTracks from "./PlaylistTracks"
import Logo from "./Logo"
import Loading from "./Loading"
import ScrollButton from "./ScrollButton"
import { TokenContext } from "./Context"

const axios = require("axios")

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=")
      initial[parts[0]] = decodeURIComponent(parts[1])
    }
    return initial
  }, {})

const App = () => {
  const { token, setNewToken } = useContext(TokenContext)
  const [playlists, setPlaylists] = useState([
    {
      id: "",
      images: [{ url: "" }],
      name: "",
      tracks: [],
    },
  ])
  const [no_data, setNo_data] = useState(false)
  const [playlistChoosen, setPlaylistChoosen] = useState(null)
  const [online, setOnline] = useState(navigator.onLine)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setNewToken(hash.access_token)
    if (token !== null && token !== undefined) {
      setLoading(true)
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (!res.data) setNo_data(true)
          else setPlaylists(res.data.items)
          setLoading(false)
        })
    }

    window.addEventListener("offline", () => {
      setOnline(false)
      console.log("offline")
    })

    window.addEventListener("online", () => {
      setOnline(true)
      console.log("online")
    })

    if (token === null || token === undefined) {
      setLoading(false)
    }
    window.location.hash = ""
  }, [token])

  const choosePlaylist = (playlistC) => {
    setPlaylistChoosen(playlistC)
  }

  const handleClickRetour = () => {
    setPlaylistChoosen(null)
  }

  if (loading)
    return (
      <div id="App">
        <Loading fullscreen />
      </div>
    )

  if (!online)
    return (
      <main id="App">
        You must be connected to internet for this app to work !
      </main>
    )

  return (
    <div id="App">
      {token && (
        <header id="AppHeader">
          <Logo />
        </header>
      )}
      <ScrollButton />
      <main id="AppContent">
        {!token && (
          <div id="Login">
            <Logo />
            <div>
              <Button
                variant="success"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
              </Button>
            </div>
          </div>
        )}

        {token && !no_data && !playlistChoosen && (
          <div className="row mx-auto m-3 playlists">
            <ListGroup className="px-0">
              {playlists.map((playlist) => (
                <Playlist
                  key={playlist.id}
                  playlist={playlist}
                  buttonOnClick={choosePlaylist}
                ></Playlist>
              ))}
            </ListGroup>
          </div>
        )}

        {playlistChoosen && (
          <div className="mb-4 col-10 col-md-7 mx-auto">
            <Button
              className="m-3"
              variant="secondary"
              onClick={handleClickRetour}
            >
              Retour
            </Button>
            <PlaylistTracks
              playlist={playlistChoosen}
              token={token}
            ></PlaylistTracks>
          </div>
        )}

        {no_data && <p>Vous n'avez aucune playlist</p>}
      </main>
    </div>
  )
}

export default App
