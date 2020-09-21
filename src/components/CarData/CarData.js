import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap"

import classes from "./CarData.module.css";

function CarData(props) {
    if(props.carData){
        const { ...CarData } = props;
    }
    return(
        <Jumbotron>
            <h1>{carData.mispar_rechev}</h1>
        </Jumbotron>
    );
}

export default CarData;
