import React from "react";
import { Navbar } from "react-bootstrap"

import classes from "./Navbar.module.css";

const navbar = () => {
  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Navbar.Brand href="/" className={classes.Logo}>פרטי רכב לפי מספר רישוי</Navbar.Brand>
    </Navbar>
  );
};

export default navbar;
