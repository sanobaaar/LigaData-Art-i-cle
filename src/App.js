import { Route, Routes } from "react-router-dom"

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
import About from "./components/About"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState("")
  const [articles, setArticles] = useState([])

  //articles can only be fetched when user is logged in - authenticated
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
      console.log("articles:", result)

      setArticles(result)
      console.log(articles)
    } catch (error) {
      handleError(error)
    }
  }

  //call for articles only when user log in state changes
  useEffect(() => {
    fetchArticles()
  }, [loggedInUser])

  return (
    <>
      {/* gets token from localStorage and sets user info */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser} />

      <Head isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        <Route path="/about" element={<About />} />
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
