import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Button from '@material-ui/core/Button'

const Template = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
   // Client-side Runtime Data Fetching
   const [bookData, setBookData] = useState(undefined)
   useEffect(() => {
     fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${frontmatter.isbn}`)
       .then(response => response.json()) // parse JSON from request
       .then(resultData => {
        setBookData(resultData)
       })
   }, [])

  const foundBook = bookData?.items[0]

  if (!foundBook) {
    return <div>Loading...</div>
  }
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div>
          {foundBook.volumeInfo.title}
          <img src={foundBook.volumeInfo.imageLinks.thumbnail} alt="" class="thumbnail" />
          <Button variant="contained">{frontmatter.genre}</Button>
        </div>
      </div>
    </div>
  )
}

export default Template

export const pageQuery = graphql`
  query($slug: String!, $isbn: String!, $genre: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug }, isbn: { eq: $isbn }, genre: { eq: $genre } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        isbn
        genre
      }
    }
  }
`