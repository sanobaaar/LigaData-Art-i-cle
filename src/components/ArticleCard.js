import React from "react"
import { Card, CardGroup } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"

const ArticleCard = ({ article }) => {

  // Format as MM/DD/YYYY
  const formatDate = dateStr => {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.getMonth() + 1 
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  return (
    <div className="article">
      <CardGroup>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.content}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{formatDate(article.date)}</small> <br></br>
            {/* Redirects to SingleArticle component */}
            <Link to={`/article/${article._id}`}>Read More</Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  )
}

export default ArticleCard
