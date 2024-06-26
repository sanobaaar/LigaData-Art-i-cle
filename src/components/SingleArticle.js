import { Link, useNavigate, useParams } from "react-router-dom"
import { handleError, handleSuccess } from "../utils"
import { ToastContainer } from "react-toastify"
import { Button, Image } from "react-bootstrap"

function SingleArticle({ articles, fetchArticles }) {
  //takes id from URL
  const params = useParams()
  const { id } = params

  const navigate = useNavigate()

  const article = articles.find(article => article._id === id)

  if (!article) {
    ;<h2>Article not found</h2>
  }

  const deleteArticle = async id => {
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

  //convert date from ISO format to DD-MM-YYYY
  const formatDate = dateStr => {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are zero-based
    const year = date.getFullYear()
    return `${month}/${day}/${year}` // Format as MM/DD/YYYY
  }

  return (
    <div>
      <div className="container">
        {article && (
          <>
            <div className="single-article">
              <div style={{ display: "flex", justifyContent:"space-between", marginBottom: "35px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2>{article.title}</h2>
                  <p>{formatDate(article.date)}</p>

                  <Link to={`/article/update/${id}`}>
                    <Button variant="info">Edit</Button>
                  </Link>
                  <Link to={`/article/${id}`}>
                    <Button variant="danger" onClick={() => deleteArticle(article._id)}>
                      Delete
                    </Button>
                  </Link>
                </div>

                <Image src={article.image} style={{ maxWidth: "100%", marginTop: "20px", textAlign: "center" }}></Image>
              </div>

              <p>{article.content}</p>
            </div>
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  )
}

export default SingleArticle
