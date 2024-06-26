import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function RefreshHandler({ setIsAuthenticated, setLoggedInUser }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true)

      const loggedInUser = localStorage.getItem("loggedInUser")
      setLoggedInUser(loggedInUser)
    }
  }, [location, navigate, setIsAuthenticated, setLoggedInUser])

  return null
}

export default RefreshHandler
