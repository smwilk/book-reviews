import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import './topPage.css'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))

export default function TopPage() {
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

  const classes = useStyles()

  function truncateText(text, maxChar) {
    if (text.length > maxChar) {
      text = text.substring(0, maxChar)
      text = text.substring(0, text.lastIndexOf(" ")) + "..."
    } 
    return text
  }

  return (
    <div id="top-page">
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            {data.allMarkdownRemark.nodes.map((node, index) => {
              const matchingBookApiData = data.bookshelf.bookShelfData[index].volumeInfo
              const truncatedReviewText = truncateText(node.html, 200)
              return(              
                <Grid item xs={6} key={index}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={4} className="book-cover">
                          <img src={matchingBookApiData.imageLinks.thumbnail} alt="Book cover image"></img>
                        </Grid>
                        <Grid item xs={8}>
                          <Button variant="outlined">{node.frontmatter.genre}</Button>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                          </Typography>
                          <Typography variant="h5" component="h2">
                            {matchingBookApiData.title}
                          </Typography>
                              <Rating name="read-only" value={node.frontmatter.rating} readOnly />
                              <Typography className={classes.pos} color="textSecondary">
                                {matchingBookApiData.authors.join(", ")}
                              </Typography>
                              <div className="review-text">
                                <Typography
                                  className="blog-post-content"
                                  dangerouslySetInnerHTML={{ __html: truncatedReviewText }}
                                />
                                <div className="read-more-button">Read full review</div>
                              </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                )
              })
            }
          </Grid>
        </div>
      </Container>
      <Link to="/books/9780062316097/">Sapiens: A Brief History of Humankind</Link>
      <br />
      <Link to="/books/9781501197277/">The Courage to Be Disliked: The Japanese Phenomenon That Shows You How to Change Your Life and Achieve Real Happiness</Link>
    </div>
  )
}
