import { Route, Routes, Navigate } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Head from "./components/Head"
import Signup from "./components/Signup"
import Articles from "./components/Articles"
import SingleArticle from "./components/SingleArticle"
import Error from "./components/Error"
import { useEffect, useState } from "react"
import RefreshHandler from "./components/RefreshHandler"
import { handleError } from "./utils"
import EditArticle from "./components/EditArticle"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState("")
  const [articles, setArticles] = useState([])

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
  }, [loggedInUser])

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser} />

      <Head isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/articles"
          element={<Articles isAuthenticated={isAuthenticated} articles={articles} fetchArticles={fetchArticles} />}
        />
        <Route
          path="/article/:id"
          element={
            <SingleArticle isAuthenticated={isAuthenticated} articles={articles} fetchArticles={fetchArticles} />
          }
        />
        <Route
          path="article/update/:id"
          element={<EditArticle isAuthenticated={isAuthenticated} articles={articles} fetchArticles={fetchArticles} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
