import React from "react"
import { Helmet } from "react-helmet"

import TopPage from "../components/topPage"
import Header from "../components/header"

import "./global.css"

const IndexPage = () => (
  <div id="index">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Humble Book Review</title>
      <link rel="canonical" href="https://humblebookreview.gtsb.io/" />
    </Helmet>
    <Header />
    <TopPage />
  </div>
)
export default IndexPage
