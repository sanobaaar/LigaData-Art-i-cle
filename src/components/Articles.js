import React, { useState } from "react"
import AddArticle from "./AddArticle"
import ArticleCard from "./ArticleCard"

const Articles = ({ isAuthenticated, articles, fetchArticles }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  return (
    <>
      <div className="articles">
        {/* If not authenticated - request for login ELSE show articles */}
        {!isAuthenticated ? (
          <h3>
            Please <a href="/login">login</a> to view the articles!
          </h3>
        ) : (
          <div className="container">
            <div>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Articles</h1>
                <button onClick={handleShow}>Add +</button>
              </span>
              <AddArticle
                showModal={showModal}
                handleClose={handleClose}
                onClick={e => e.stopPropagation()} //disables modal from closing on clicks
                fetchArticles={fetchArticles}
              />
            </div>
            <div>
              {/* Check if articles is an array and size greater than 0 to show them in individual card */}
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
