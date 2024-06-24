import React, { useEffect, useState } from "react"
import Login from "./Login"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { handleError, handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [articles, setArticles] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"))
  }, [])

  const fetchArticles = async () => {
    try {
      const url = "http://localhost:8080/articles"
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
      const response = await fetch(url, headers)
      const result = await response.json()
      console.log("articles:", result)
      setArticles(result)
      console.log(articles)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const logout = e => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("User logged out!")
    setTimeout(() => {
      navigate("/")
    }, 1500)
  }

  return (
    <>
      <section>
        <div className="background-image">
          <div className="home-text">
            <h1>Publishing Made Easy!</h1>
            {loggedInUser ? <div>{articles && articles?.map(item => <h1>{item.title}</h1>)}</div> : null}
            <br></br>

            <Button variant="success">Get Started!</Button>
            {loggedInUser ? <button onClick={logout}>Logout!</button> : null}
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Home
