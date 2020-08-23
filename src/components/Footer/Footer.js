import React from "react";

import classes from "./Footer.module.css";

const footer = () => {
    return (
        <footer className={classes.Footer}>
            <p className={classes.Text}>&copy; <span className={classes.Logo} onClick={()=>{alert("היי עדיין אין לנו אתר אבל נחמד שלחצת")}}>BLACKCAT</span> {new Date().getFullYear()}</p>
        </footer>
    );
};

export default footer;