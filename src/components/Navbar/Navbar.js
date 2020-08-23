import React from "react";

import classes from "./Navbar.module.css";

const navbar = () => {
    return (
        <header className={classes.Header}>
            <div >
                <h1 className={classes.Logo}>מידע על רכב לפי מספר</h1>
            </div>
        </header>
    );
};

export default navbar;