import React, { useEffect, useState } from "react"
import { handleError } from "../utils"
import { CardGroup } from "react-bootstrap"
import AddArticle from "./AddArticle"
import ArticleCard from "./ArticleCard"

const Articles = ({ isAuthenticated, articles, fetchArticles }) => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <div className="articles">
        {!isAuthenticated ? (
          <h3>
            Please <a href="/login">login</a> to view the articles!
          </h3>
        ) : (
          <div className="container">
            <div>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Articles</h1>
                <button onClick={toggleModal}>Add +</button>
              </span>
              <AddArticle show={showModal} onClose={toggleModal} fetchArticles={fetchArticles} />
            </div>
            <div>
              {Array.isArray(articles) && articles.length > 0 ? (
                <div>
                  {articles?.map((article, index) => (
                    <ArticleCard article={article} />
                  ))}
                </div>
              ) : (
                <p>No articles found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Articles
