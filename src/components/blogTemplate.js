import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Button from '@material-ui/core/Button'
import Header from "./header"
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import './blogTemplate.css'

const Template = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark, book } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const foundBook = book.bookData
  return (
    <div id="blog-post-container">
      <Header>
        <a href="#" class="previous round">&#8249;</a>
      </Header>
      <div className="blog-post">
        <div class="hero-content">
          <Grid container spacing={1}>
            <Grid item xs={3} className="book-thumbnail">
              <img src={foundBook.volumeInfo.imageLinks.thumbnail} alt="book-cover" class="thumbnail" />
            </Grid>
            <Grid item xs={8} className="book-description">
              <h1 className="book-title">{frontmatter.title}</h1>
              <h2 className="book-authors">By {foundBook.volumeInfo.authors.join(", ")}</h2>
              <Rating name="read-only" value={frontmatter.rating} readOnly />
              <Button variant="contained" className="book-genre">{frontmatter.genre}</Button>
            </Grid>
          </Grid>
        </div>
          <div className="background-banner-container">
            <div
              className="background-banner-image"
              style={{backgroundImage: `url(${foundBook.volumeInfo.imageLinks.thumbnail})`}}
            >
              <div className="background-banner-layer" />
            </div>
          </div>
        <div className="blog-post-main">
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div>
          </div>
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
        rating
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