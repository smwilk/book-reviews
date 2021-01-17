import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby blog with Markdown pages.</p>
    <p>
      <Link to="/books/9780062316097/">Sapiens: A Brief History of Humankind</Link>
      <br />
      <Link to="/books/9781501197277/">The Courage to Be Disliked: The Japanese Phenomenon That Shows You How to Change Your Life and Achieve Real Happiness</Link>
    </p>
  </Layout>
)

export default IndexPage