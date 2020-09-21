import React, { useState } from "react";
import { Jumbotron, Button, Table, Alert } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import classes from "./Middle.module.css";
import plate from "../../assets/plate.png";


function Middle() {
    const [carNumber, setCarNumber] = useState("");
    const [carData, setCarData] = useState("");
    const [totalLossCar, setTotalLossCar] = useState("");
    const [tav, setTav] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const carNumberHandler = (event) => {
        if(event.target.value.length <=8){
            setCarNumber(event.target.value);
        }else{
            alert("בלוחיות רישוי ישראליות יש עד 8 ספרות!");
        }
    };

    const checkCarDataHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if(carNumber){
            axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=" + carNumber)
                .then((res) => {
                    setCarData(res.data.result.records[0]);
                    axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=" + carNumber)
                        .then((res) => {
                            setTav(res.data.result.records[0]);
                            setIsLoading(false);
                        })
                        .catch((err) => console.log(err));

                    if(res.data.result.records[0] === undefined){
                        axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=851ecab1-0622-4dbe-a6c7-f950cf82abf9&q=" + carNumber)
                            .then((res) => {
                                setTotalLossCar(res.data.result.records[0]);
                                setIsLoading(false);
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    let haveTav = tav && <Alert variant="primary"><Alert.Heading>לרכב זה יש תג נכה!</Alert.Heading></Alert>
    let carDataComponents;
    if(carData && !isLoading){
        carDataComponents = (
            <Jumbotron className={classes.Middle}>
                <h1>פרטי הרכב:</h1>
                {haveTav}
                <Table striped bordered hover size="sm">
                    <tbody className={classes.CarData}>
                        <tr>
                            <td>מספר רכב</td>
                            <td>{carData.mispar_rechev}</td>
                        </tr>
                        <tr>
                            <td>יצרן</td>
                            <td>{carData.tozeret_nm}</td>
                        </tr>
                        <tr>
                            <td>דגם</td>
                            <td>{carData.kinuy_mishari}</td>
                        </tr>
                        <tr>
                            <td>רמת גימור</td>
                            <td>{carData.ramat_gimur}</td>
                        </tr>
                        <tr>
                            <td>שנת יצור</td>
                            <td>{carData.shnat_yitzur}</td>
                        </tr>
                        <tr>
                            <td>בעלות</td>
                            <td>{carData.baalut}</td>
                        </tr>
                        <tr>
                            <td>צבע רכב</td>
                            <td>{carData.tzeva_rechev}</td>
                        </tr>
                        <tr>
                            <td>תוקף רישיון רכב</td>
                            <td>{carData.tokef_dt}</td>
                        </tr>
                        <tr>
                            <td>תאריך מבחן רישוי אחרון</td>
                            <td>{carData.mivchan_acharon_dt}</td>
                        </tr>
                        <tr>
                            <td>מידות צמיג קדמי</td>
                            <td>{carData.zmig_kidmi}</td>
                        </tr>
                        <tr>
                            <td>מידות צמיג אחורי</td>
                            <td>{carData.zmig_ahori}</td>
                        </tr>
                        <tr>
                            <td>מספר שלדה</td>
                            <td>{carData.misgeret}</td>
                        </tr>
                        <tr>
                            <td>קבוצת זיהום</td>
                            <td>{carData.kvutzat_zihum}</td>
                        </tr>
                        <tr>
                            <td>רמת אבזור בטיחותי</td>
                            <td>{carData.ramat_eivzur_betihuty}</td>
                        </tr>
                        <tr>
                            <td>סוג מנוע</td>
                            <td>{carData.sug_delek_nm}</td>
                        </tr>
                        <tr>
                            <td>דגם מנוע</td>
                            <td>{carData.degem_manoa}</td>
                        </tr>
                    </tbody>
                </Table>
            </Jumbotron>
        );
    }

    if(totalLossCar && !isLoading){
        carDataComponents = (
            <Jumbotron className={classes.Middle}>
                <Alert variant="danger" style={{width: "100%", textAlign: "center"}} >
                    <Alert.Heading>רכב זה הורד מהכביש!</Alert.Heading>
                    <p>על פי מאגר משרד התחבורה רישיון רכב זה בוטל בתאריך: {totalLossCar.bitul_dt}</p>
                </Alert>
            </Jumbotron>
        );
    }

    return(
        <React.Fragment>
            <Jumbotron  className={classes.Middle}>
                    <div className={classes.Text}>
                        <h1>חיפוש פרטי רכב לפי מספר רישוי</h1>
                        <p>מאגר זה מכיל מידע רשמי של מספרי רישוי של כלי הרכב הפעילים הפרטיים משנת יצור 
                        1996 ומעלה ומספרי הרישוי של כלי הרכב הפעילים המסחריים במשקל עד 3,500 ק"ג משנת יצור 1998 ומעלה.</p>
                    </div>
                    <img src={plate} className={classes.Plate} alt="lp" />
                    <form onSubmit={checkCarDataHandler}>
                        <div className={classes.Lp}>
                            <input type="number" name="lpNumber" pattern="[0-9]*"  className={classes.Input} onChange={carNumberHandler} value={carNumber} />
                        </div>
                        <div className={classes.BtnCon}>
                            <Button variant="primary" type="submit" value="submit" disabled={!carNumber} className={classes.Btn}>{isLoading ? "טוען..." : "חפש!"}</Button>
                        </div>
                    </form>
            </Jumbotron>
            {carDataComponents}
        </React.Fragment>
    );
};

export default Middle