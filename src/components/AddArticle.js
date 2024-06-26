import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { handleError, handleSuccess } from "../utils"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function AddArticle({ showModal, handleClose, fetchArticles }) {
  const [selectedFile, setSelectedFile] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const navigate = useNavigate()

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    date: "",
    image: null,
  })

  const handleFileChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file)

    console.log(selectedFile)

    // Display the selected image preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageUrl(reader.result)
      console.log(imageUrl)
    }
    if (file) {
      console.log(file)
      reader.readAsDataURL(file)
    }

    console.log(articleData);

    setArticleData(prevState => ({
      ...prevState,
      image: imageUrl,
    }))
  }

  const handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target
    console.log(name, value)
    const copyArticleData = { ...articleData }
    copyArticleData[name] = value
    setArticleData(copyArticleData)
    console.log(articleData)
  }

  const addArticle = async e => {
    e.preventDefault()
    const { title, content, date, image } = articleData
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
      handleClose()
      setArticleData({
        title: "",
        content: "",
        date: "",
        image: "",
      })
    } catch (err) {
      return handleError(err)
    }
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-add" onSubmit={addArticle}>
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
            <textarea
              name="content"
              className="form-control"
              value={articleData.content}
              onChange={handleChange}
              placeholder="Enter your content"
              rows="5"
            />

            <label>Date:</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              autoComplete="off"
              value={articleData.date}
              required
            />

            <label>Image:</label>
            <input type="file" name="image" onChange={handleFileChange} />

            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addArticle}>
            Publish
          </Button> */}
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default AddArticle
