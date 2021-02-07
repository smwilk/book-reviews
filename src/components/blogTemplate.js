import React from "react"
import { graphql } from "gatsby"
import Button from "@material-ui/core/Button"
import Header from "./header"
import Grid from "@material-ui/core/Grid"
import Rating from "@material-ui/lab/Rating"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { Link } from "gatsby"
import "./blogTemplate.css"

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 667,
      md: 1045,
      lg: 1280,
      xl: 1920,
    },
  },
})

const Template = ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { markdownRemark, book } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const foundBook = book.bookData
  return (
    <ThemeProvider theme={theme}>
      <div id="blog-post-container">
        <Link to="/" className="back-button">
          <ArrowBackIcon />
        </Link>
        <Header>
          <a href="#" className="previous round">
            &#8249;
          </a>
        </Header>
        <section className="blog-post">
          <div className="hero-content">
            <Grid container spacing={1}>
              <Grid item xs={12} md={3} className="book-thumbnail">
                <div className="book-gradient">
                  <img
                    src={foundBook.volumeInfo.imageLinks.thumbnail}
                    alt="book-cover"
                    className="thumbnail"
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={8} className="book-description">
                <h1 className="book-title">{frontmatter.title}</h1>
                <h2 className="book-authors">
                  By {foundBook.volumeInfo.authors.join(", ")}
                </h2>
                <Rating name="read-only" value={frontmatter.rating} readOnly />
                <Button
                  variant="contained"
                  className="book-genre"
                  disabled
                >
                  {frontmatter.genre}
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className="background-banner-container">
            <div
              className="background-banner-image"
              style={{
                backgroundImage: `url(${foundBook.volumeInfo.imageLinks.thumbnail})`,
              }}
            >
              <div className="background-banner-layer" />
            </div>
          </div>
        </section>
        <main className="blog-post-main">
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </main>
      </div>
    </ThemeProvider>
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
    book(id: { eq: $isbn }) {
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
