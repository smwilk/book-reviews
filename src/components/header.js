
import React from "react"
import { Link } from "gatsby"
import './header.css'
import BrushIcon from '@material-ui/icons/Brush'

const Header = () => (
  <header>
    <div id="primary-header">
      <div className="header-container">
        <Link to="/" >
          <BrushIcon />
          Humble Book Review
        </Link>
      </div>
    </div>
  </header>
)

export default Header