import React from "react"
import { Card, CardGroup } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import SingleArticle from "./SingleArticle"

const ArticleCard = ({ article }) => {
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
            <small className="text-muted">{article.date}</small> <br></br>
            <Link to={`/article/${article._id}`}>Read More</Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
  )
}

export default ArticleCard
