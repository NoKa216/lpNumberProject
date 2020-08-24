import React, { useState } from "react";
import axios from "axios";

import classes from "./Middle.module.css";
import plate from "../../assets/plate.png"

function Middle() {
    const [lpNumber, setLpNumber] = useState("");
    const [carData, setCarData] = useState("");
    const [tav, setTav] = useState("");
    const [isLoading,setLoading] = useState(false);

    const numberHandleChange = (event) =>{
        if(event.target.value.length <=8){
            setLpNumber(event.target.value);
        }else{
            alert("בלוחיות רישוי ישראליות יש עד 8 ספרות!")
        }
        
    }

    const chackLpNumberHandeler = (event) => {
        event.preventDefault();
        setLoading(true);
        if(lpNumber){
            axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q="+lpNumber) /// מוצא את פרטי הרכב במאגר
                .then((res)=>{
                    setCarData(res.data.result.records[0])
                    axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q="+lpNumber) /// בודק אם לרכב יש תג נכה
                        .then((res)=>{
                            setTav(res.data.result.records[0]);
                            setLoading(false)
                        }).catch((err)=>{
                            console.log(err);
                        });
                })
                .catch((err) => {console.log(err);});
        }else{
            alert("נא להזין מספר רכב");
        }
    }

    const data = carData && (
        <div className={classes.Data}>
            <h2>פרטי הרכב:</h2>
            {tav && <h3>יש לרכב תג נכה</h3>}
            <p>מספר רכב: {carData.mispar_rechev}</p>
            <p>שם תוצר:  {carData.tozeret_nm}</p>
            <p>כינוי מסחרי:  {carData.kinuy_mishari}</p>
            <p>רמת גימור:  {carData.ramat_gimur}</p>
            <p>שנת יצור:   {carData.shnat_yitzur}</p>
            <p>תוקף רישיון רכב:  {carData.tokef_dt}</p>
            <p>תאריך טסט:  {carData.mivchan_acharon_dt}</p>
            <p>בעלות:  {carData.baalut}</p>
            <p>קבוצת זיהום:  {carData.kvutzat_zihum}</p>
            <p>רמת איבזור בטיחותי:  {carData.ramat_eivzur_betihuty}</p>
            <p>מספר שלדה:  {carData.misgeret}</p>
            <p>קוד תוצר: {carData.tozeret_cd}</p>
            <p>סוג דגם:  {carData.sug_degem}</p>
            <p>שם דגם:  {carData.degem_cd}</p>
            <p>דגם מנוע:  {carData.degem_manoa}</p>
        </div>
    );
    const loadingOrData = isLoading ? <div className={classes.Loader}>טוען...</div> : data;
    return (
        <section className={classes.Middle}>
            <div className={classes.Text}>
                <h1>חיפוש פרטי רכב לפי מספר רישוי</h1>
                <p>מאגר זה מכיל מידע רשמי של מספרי רישוי של כלי הרכב הפעילים הפרטיים משנת יצור 
                1996 ומעלה ומספרי הרישוי של כלי הרכב הפעילים המסחריים במשקל עד 3,500 ק"ג משנת יצור 1998 ומעלה.</p>
            </div>
            <img src={plate} className={classes.Plate} alt="lp" />
            <form onSubmit={chackLpNumberHandeler}>
                <div className={classes.Lp}>
                    <input type="number" name="lpNumber" pattern="[0-9]*"  className={classes.Input} value={lpNumber} onChange={numberHandleChange} />
                    <button type="submit" value="submit" className={classes.Btn} disabled={!lpNumber}>חפש!</button>
                </div>
                
            </form>
            {loadingOrData}
        </section>
    );
};

export default Middle