import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { handleError, handleSuccess } from "../utils"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function AddArticle({ show, onClose, children, fetchArticles }) {
  const handleClose = () => (show = false)
  const handleShow = () => (show = false)

  const navigate = useNavigate()

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    console.log(name, value)
    const copyArticleData = { ...articleData }
    copyArticleData[name] = value
    setArticleData(copyArticleData)
    console.log(articleData)
  }

  const addArticle = async e => {
    e.preventDefault()
    const { title, content, date } = articleData
    if (!title || !content) {
      handleError("All fields are required!")
    }
    try {
      const url = "http://localhost:8080/articles/new"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })
      const result = await response.json()
      const { success, message, error } = result
      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate("/articles")
          fetchArticles()
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
    <>
      <Modal show={show} onClick={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="modal-form" onSubmit={addArticle}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter your title"
              onChange={handleChange}
              autoComplete="off"
              value={articleData.title}
              required
            />

            <label>Content:</label>
            <input
              type="text"
              name="content"
              placeholder="Enter content"
              onChange={handleChange}
              value={articleData.content}
              autoComplete="off"
            />

            <button type="submit" value="Submit">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addArticle}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default AddArticle
