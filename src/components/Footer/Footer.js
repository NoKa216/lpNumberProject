import React from "react";
import { Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


import classes from "./Footer.module.css";

const footer = () => {
  return (
    <Navbar bg="primary" variant="dark" fixed="bottom" className={classes.Navbar}>
        <Navbar.Brand className="mx-auto">
            <p className={classes.Text}>&copy; <span className={classes.Logo} onClick={()=>{alert("היי עדיין אין לנו אתר אבל נחמד שלחצת")}}>BLACKCAT</span> {new Date().getFullYear()}</p>
        </Navbar.Brand>
    </Navbar>
  );
};

export default footer;
