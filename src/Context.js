import React, { createContext, useState, useEffect } from "react"

export const TokenContext = createContext()

const Context = (props) => {
  const [token, setToken] = useState()

  useEffect(() => {
    const expiresDate = localStorage.getItem("RC-SpotifyTokenExpires")
    if (expiresDate && expiresDate < Date.now() - 3600 * 1000) {
      localStorage.clear()
      setToken(null)
      return
    }
    const t = localStorage.getItem("RC-SpotifyToken")
    if (t) setToken(t)
  })

  const setNewToken = (t) => {
    if (token === t) return
    if (t !== undefined) {
      localStorage.setItem("RC-SpotifyToken", t)
      localStorage.setItem("RC-SpotifyTokenExpires", Date.now())
    }
    setToken(t)
  }

  return (
    <TokenContext.Provider value={{ token, setNewToken }}>
      {props.children}
    </TokenContext.Provider>
  )
}

export default Context
