import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Button from '@material-ui/core/Button'
import Header from "./header"
import './blogTemplate.css'

const Template = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark, book } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const foundBook = book.bookData
  return (
    <div id="blog-post-container">
      <Header />
      <div className="blog-post">
        <div
          className="background-banner-container"
          style={{backgroundImage: `url(${foundBook.volumeInfo.imageLinks.thumbnail})`}}
        >
          <div className="background-banner">
          </div>
        </div>
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
  query($slug: String!, $isbn: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug }, isbn: { eq: $isbn } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        isbn
        genre
      }
    }
    book(id: {eq: $isbn}) {
      bookData {
        isbn
        volumeInfo {
          title
          subtitle
          publisher
          publishedDate
          description
          pageCount
          printType
          averageRating
          ratingsCount
          maturityRating
          allowAnonLogging
          contentVersion
          language
          previewLink
          infoLink
          canonicalVolumeLink
          authors
          imageLinks {
            thumbnail
          }
        }
      }
    }
  }
`