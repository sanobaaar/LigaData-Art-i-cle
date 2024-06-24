import React from 'react'
import { useParams } from 'react-router-dom'

const SingleArticle = () => {

const {id} = useParams();

  return (
    <div>
      <h2>Single movie {id}</h2>
    </div>
  )
}

export default SingleArticle