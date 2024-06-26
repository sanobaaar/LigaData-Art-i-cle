import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { handleError, handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"
import { Button } from "react-bootstrap"

const EditArticle = ({ isAuthenticated, articles, fetchArticles }) => {
  //use ID from URL
  const params = useParams()
  const { id } = params

  const [articleData, setArticleData] = useState()

  const navigate = useNavigate()

  const article = articles.find(article => article._id === id)
  console.log(article)
  if (!article) {
    ;<h2>Article not found</h2>
  }

  //Format as MM/DD/YYYY
  const formatDate = dateStr => {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
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

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const url = `http://localhost:8080/articles/update/${id}`
      const response = fetch(url, {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("token"), "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      })

      handleSuccess("Edited successfully!")
      setTimeout(() => {
        fetchArticles()
        navigate(`/article/${id}`)
      }, 3400)

      // This part of Code does not work due to Pending Promise that does not return json object values
      const result = await response.json()

      console.log("after result")

      console.log(result)

      // const { success, message, jwtToken, name, error } = result
      // if (success) {
      //   handleSuccess(message)
      //   console.log(message)
      //   localStorage.setItem("token", jwtToken)
      //   localStorage.setItem("loggedInUser", name)
      //   setTimeout(() => {
      //     fetchArticles()
      //     navigate("/article/" + "id")
      //   }, 2000)
      // } else if (error) {
      //   const details = error?.details[0].message
      //   handleError(details)
      // } else if (!success) {
      //   handleError(message)
      // }
      // console.log(result)
    } catch (err) {
      return handleError(err)
    }
  }
  return (
    <div>
      <div className="container">
        {article && (
          <form className="form-login" onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center" }}>Edit Article</h2>
            <h4>Title</h4>
            <input
              type="text"
              name="title"
              placeholder="Enter your first name"
              autoComplete="off"
              defaultValue={article.title}
              onChange={handleChange}
              required
            />
            <h4>Content</h4>
            <textarea
              type="text"
              name="content"
              rows={5}
              defaultValue={article.content}
              onChange={handleChange}
              autoComplete="off"
            />
            <h4>Date</h4>
            <p>{formatDate(article.date)}</p>

            <input type="date" onChange={handleChange} name="date" value={article.date} autoComplete="off" />

            <Button type="submit" variant="success">Submit</Button>
          </form>
        )}
        <ToastContainer />
      </div>
    </div>
  )
}

export default EditArticle
