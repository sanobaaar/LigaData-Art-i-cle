import Home from "./components/Home"
import Login from "./components/Login"
import Head from "./components/Head"
import { Route, Routes, useNavigate } from "react-router-dom"
import Signup from "./components/Signup"
import Articles from "./components/Articles"
import SingleArticle from "./components/SingleArticle"
import Error from "./components/Error"
import { handleError, handleSuccess } from "./utils"
import { useEffect, useState } from "react"

function App() {
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
      setArticles(result)
      console.log("articles:", result)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [loggedInUser])

  const logout = e => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("User logged out!")
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }
  return (
    <div className="App">
      <Head />

      <Routes>
        <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<SingleArticle />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
