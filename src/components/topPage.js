import React from "react"
import { Link } from "gatsby"
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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

const TopPage = (props) => {
  const [spacing] = React.useState(2)
  const [value] = React.useState(2)
  const classes = useStyles()
  const books = [
    {
      title: "Sapiens",
      isbn: ""
    },
    {
      title: "Courage to be disliked",
      isbn: ""
    },
    {
      title: "Buchi boi",
      isbn: ""
    }
  ]
  return (
    <div id="top-page">
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            {books.map((book, id) => {
              return(              
                <Grid item xs={6}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {book.title}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {book.isbn}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        adjective
                      </Typography>
                      <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                      <Rating name="read-only" value={value} readOnly />
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                </Grid>
                )
              })
            }
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Link to="/books/9780062316097/">Sapiens: A Brief History of Humankind</Link>
      <br />
      <Link to="/books/9781501197277/">The Courage to Be Disliked: The Japanese Phenomenon That Shows You How to Change Your Life and Achieve Real Happiness</Link>
    </div>
  )
}

export default TopPage