import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Rating from "@material-ui/lab/Rating"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typewriter from "typewriter-effect"
import "./topPage.css"

const readingTime = require("../images/reading-time.svg")

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

export default function TopPage() {
  const [value, setValue] = useState(0)
  const [selectedGenre, setGenre] = useState("All")
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // query for book data from Google Books API
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark {
        nodes {
          html
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            isbn
            genre
            rating
          }
        }
      }
      bookshelf {
        bookShelfData {
          isbn
          volumeInfo {
            authors
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
            imageLinks {
              thumbnail
            }
          }
        }
      }
    }
  `)

  const genreMap = new Set()
  data.allMarkdownRemark.nodes.forEach((node) => {
    genreMap.add(node.frontmatter.genre)
  })
  const genreArr = ["All", ...genreMap]

  function truncateText(text, maxChar) {
    if (text.length > maxChar) {
      text = text.substring(0, maxChar)
      text = text.substring(0, text.lastIndexOf(" ")) + "..."
    }
    return text
  }

  function filterByGenre(genre) {
    setGenre(genre)
  }

  const filteredData =
    selectedGenre === "All"
      ? data.allMarkdownRemark.nodes
      : data.allMarkdownRemark.nodes.filter(
        (node) => node.frontmatter.genre === selectedGenre
      )
  return (
    <ThemeProvider theme={theme}>
      <div id="top-page">
        <div className="banner-container">
          <div className="banner-text-container">
            <div>Hello! My name is Minami.</div>
            <div>I read books about</div>
            <Typewriter
              className="type-writer"
              options={{
                strings: [
                  "Technology",
                  "History",
                  "Science",
                  "Nutrition",
                  "Philosophy",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="banner-image-container">
            <img src={readingTime} alt="reading-woman" />
          </div>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
        >
          {genreArr.map((genre, index) => {
            return (
              <Tab
                label={genre}
                key={index}
                onClick={() => filterByGenre(genre)}
              />
            )
          })}
        </Tabs>
        <Container maxWidth="lg" className="top-page-container">
          <div className="card-container">
            <Grid container>
              {filteredData.map((node, index) => {
                const matchingBookApiData = data.bookshelf.bookShelfData.find(
                  (book) => book.isbn === node.frontmatter.isbn
                ).volumeInfo
                const truncatedReviewText = truncateText(node.html, 200)
                return (
                  <Grid item sm={12} md={6} key={index}>
                    <div className="card-inner-container">
                      <Grid container spacing={2}>
                        <Grid item xs={4} className="book-cover">
                          <Link
                            to={
                              "/books/" +
                              data.bookshelf.bookShelfData[index].isbn +
                              "/"
                            }
                            className="link-to-review"
                          >
                            <img
                              src={matchingBookApiData.imageLinks.thumbnail}
                              alt="Book cover"
                            />
                          </Link>
                        </Grid>
                        <Grid item xs={6} className="card-text-container">
                          <Button
                            variant="outlined"
                            onClick={() =>
                              filterByGenre(node.frontmatter.genre)
                            }
                          >
                            {node.frontmatter.genre}
                          </Button>
                          <Typography
                            className="card-title"
                            color="textSecondary"
                            gutterBottom
                          ></Typography>
                          <Typography variant="h5" component="h2">
                            {matchingBookApiData.title}
                          </Typography>
                          <Rating
                            name="read-only"
                            value={node.frontmatter.rating}
                            readOnly
                          />
                          <Typography
                            className="card-author"
                            color="textSecondary"
                          >
                            {matchingBookApiData.authors.join(", ")}
                          </Typography>
                          <div className="review-text">
                            <Typography
                              className="blog-post-content"
                              dangerouslySetInnerHTML={{
                                __html: truncatedReviewText,
                              }}
                            />
                            <Link
                              to={
                                "/books/" +
                                node.frontmatter.isbn +
                                "/"
                              }
                              className="link-to-review"
                            >
                              <div className="read-more-button">
                                Read full review
                              </div>
                            </Link>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <Divider light className="card-divider" />
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </Container>
        <br />
      </div>
    </ThemeProvider>
  )
}
