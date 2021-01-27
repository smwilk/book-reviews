
import React from "react"
import { Link } from "gatsby"
import './header.css'
const ladyinaheart = require('../images/ladyinaheart.svg')

const Header = () => (
  <header>
    <div id="primary-header">
      <div className="header-container">
        <Link to="/" >
          <img src={ladyinaheart} className="header-icon" />
          Read with Soul
        </Link>
      </div>
    </div>
  </header>
)

export default Header