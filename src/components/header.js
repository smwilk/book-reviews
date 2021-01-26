
import React from "react";
import { Link } from "gatsby"
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './header.css'

const Header = () => (
  <header>
    <div id="primary-header">
      <div className="header-container">
        <div className="header-icon icon-container"/>
        <Link to="/" >Henlo</Link>
      </div>
    </div>
    <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="header-button" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="header-title">
            Read with Soul
          </Typography>
        </Toolbar>
      </AppBar>
  </header>
)

export default Header