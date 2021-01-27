import React from "react"
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
import './topPage.css'
const readingTime = require('../images/reading-time.svg')

export default function TopPage() {
  const [value, setValue] = React.useState(0);
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

  function truncateText(text, maxChar) {
    if (text.length > maxChar) {
      text = text.substring(0, maxChar)
      text = text.substring(0, text.lastIndexOf(" ")) + "..."
    } 
    return text
  }

  return (
    <div id="top-page">
      <div className="banner-container">
        <div className="banner-text-container">
          <div>Find reviews of books</div>
          <div>I read with my           
            <svg width="75" height="75" viewBox="0 0 200 100">
              <g transform="translate(100 100)">
                <path transform="translate(-50 -50)" fill="tomato" d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0 c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"></path>
                <animateTransform 
                  attributeName="transform" 
                  type="scale" 
                  values="1; 1.5; 1.25; 1.5; 1.5; 1;" 
                  dur="1s" 
                  repeatCount="indefinite"
                  additive="sum">
                </animateTransform>
              </g>
          </svg>
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
        <Tab label="PHILOSOPHY"/>
        <Tab label="SCIENCE"/>
        <Tab label="HISTORY"/>
        <Tab label="PHILOSOPHY"/>
        <Tab label="SCIENCE"/>
        <Tab label="HISTORY"/>
        <Tab label="HISTORY"/>
      </Tabs>
      <Container maxWidth="lg" className="top-page-container">
        <div className="card-container">
          <Grid container>
            {data.allMarkdownRemark.nodes.map((node, index) => {
              const matchingBookApiData = data.bookshelf.bookShelfData[index].volumeInfo
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
