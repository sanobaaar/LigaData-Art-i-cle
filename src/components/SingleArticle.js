import React, { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { handleError, handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"
import EditModal from "./EditArticle"

function SingleArticle({ articles, fetchArticles }) {
  const params = useParams()
  const { id } = params

  const navigate = useNavigate()

  const article = articles.find(article => article._id === id)
  console.log(article)
  if (!article) {
    ;<h2>Article not found</h2>
  }

  const deleteArticle = async id => {
    console.log(id)
    try {
      const url = `http://localhost:8080/articles/delete/${id}`
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()
      const { success, message, error } = result
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          fetchArticles()
          navigate("/articles")
        }, 2000)
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
      console.log(result)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div>
      <div className="container">
        {article && (
          <div className="form-login">
            <h2 style={{ textAlign: "center" }}>{article.title}</h2>

            <label>Content</label>
            <h3>{article.content}</h3>
            <label>Date:</label>
            <span>{article.date}</span>
            <Link to={`/article/update/${id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteArticle(article._id)}>Delete</button>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  )
}

export default SingleArticle
