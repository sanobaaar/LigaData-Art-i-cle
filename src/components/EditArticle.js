import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { handleError, handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"

const EditArticle = ({ isAuthenticated, articles, fetchArticles }) => {
  const params = useParams()
  const { id } = params
  const navigate = useNavigate()

  const [articleData, setArticleData] = useState()

  const article = articles.find(article => article._id === id)
  console.log(article)
  if (!article) {
    ;<h2>Article not found</h2>
  }

  const handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    console.log(name, value)
    const copyFormData = { ...articleData }
    copyFormData[name] = value
    setArticleData(copyFormData)
    console.log(articleData)
  }

  const editArticle = async article => {
    try {
      const url = `http://localhost:8080/articles/update/${id}`
      const response = fetch(url, {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      })

      const result = await response.json()

      const { success, message, jwtToken, name, error } = result
      if (success) {
        handleSuccess(message)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", name)
        setTimeout(() => {
          navigate("/articles")
        }, 2000)
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
      console.log(result)
    } catch (err) {
      return handleError(err)
    }
  }
  return (
    <div>
      <div className="container">
        {article && (
          <form className="form-login" onSubmit={() => editArticle(article)}>
            <h2 style={{ textAlign: "center" }}>Edit Article</h2>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter your first name"
              autoComplete="off"
              defaultValue={article.title}
              onChange={handleChange}
              required
            />
            <label>Content</label>
            <input
              type="text"
              name="content"
              placeholder="Enter your last name"
              defaultValue={article.content}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Date:</label>

            <input type="date" onChange={handleChange} name="date" defaultValue={article.date} autoComplete="off" />
            <button type="submit" value="Submit">
              Submit
            </button>
          </form>
        )}
        <ToastContainer />
      </div>
    </div>
  )
}

export default EditArticle
