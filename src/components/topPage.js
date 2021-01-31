import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typewriter from 'typewriter-effect';
import './topPage.css'

const readingTime = require('../images/reading-time.svg')

export default function TopPage() {
  const [value, setValue] = useState(0);
  const [ selectedGenre, setGenre ] = useState("all")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  data.allMarkdownRemark.nodes.forEach((node, index) => {
    genreMap.add(node.frontmatter.genre)
  })
  const genreArr = ["all", ...genreMap]

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
  
  const filteredData = selectedGenre === "all" ? data.allMarkdownRemark.nodes : data.allMarkdownRemark.nodes.filter(node => node.frontmatter.genre === selectedGenre)
  
  return (
    <div id="top-page">
      <div className="banner-container">
        <div className="banner-text-container">
          <div>Hello! My name is Minami.</div>
          <div>I like to read books about &nbsp;
          <Typewriter
            className="type-writer"
            options={{
              strings: ['Technology', 'History', 'Science', 'Nutrition', 'Philosophy'],
              autoStart: true,
              loop: true,
            }}
          />
          </div>
        </div>
        <div className="banner-image-container">
          <img src={readingTime}/>
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
              const matchingBookApiData = data.bookshelf.bookShelfData.find(book => book.isbn === node.frontmatter.isbn).volumeInfo
              const truncatedReviewText = truncateText(node.html, 200)
              return(              
                <Grid item xs={6} key={index}>
                    <div className="card-inner-container">
                      <Grid container spacing={1}>
                        <Grid item xs={4} className="book-cover">
                          <img src={matchingBookApiData.imageLinks.thumbnail} alt="Book cover image"></img>
                        </Grid>
                        <Grid item xs={7}>
                          <Button variant="outlined">{node.frontmatter.genre}</Button>
                          <Typography className="card-title" color="textSecondary" gutterBottom>
                          </Typography>
                          <Typography variant="h5" component="h2">
                            {matchingBookApiData.title}
                          </Typography>
                          <Rating name="read-only" value={node.frontmatter.rating} readOnly />
                          <Typography className="card-author" color="textSecondary">
                            {matchingBookApiData.authors.join(", ")}
                          </Typography>
                          <div className="review-text">
                            <Typography
                              className="blog-post-content"
                              dangerouslySetInnerHTML={{ __html: truncatedReviewText }}
                            />
                              <Link to={"/books/" + data.bookshelf.bookShelfData[index].isbn + "/"} className="link-to-review">
                                <div className="read-more-button">Read full review</div>
                              </Link>
                          </div>
                        </Grid>
                      </Grid>
                  </div>
                  <Divider light className="card-divider" />
                </Grid>
                )
              })
            }
          </Grid>
        </div>
      </Container>
      <br />
    </div>
  )
}
