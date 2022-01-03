import Button from '../Button';
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar'
import InfoSubHeader from "../InfoSubHeader";
import '../Calendar.css';
import Axios from "axios";
import { useEffect, useState } from 'react';
import GuestInfo from '../GuestInfo';
// import './Home.css';

const Planner = () => {
    const data = JSON.parse(localStorage.getItem('data'));
    let allDates = [];
    let gData = [];
    
    const [guestData, setGData] = useState([]);
    const [guestDates, setGDates] = useState([]);
    const [cDate, setCDate] = useState("");

    // const []

    useEffect(()=>{
        Axios.get("http://localhost:3001/api/event_details",{ params: { code: data[5] } })
        .then((res)=>{
            console.log("test");
            gData = res.data;
            // let numGuests = guestData.length;
            // let half = [];
            // create array where each element contains attending guest indices
            gData.forEach((el,i) => {
                el.dates.forEach((date,x)=>{
                    if(allDates.length<el.dates.length){
                        allDates.push([]);
                    }
                    if (date.selected==true){
                        allDates[x].push(i);
                    }
                });
            });
            console.log(allDates);
            // only update the states if the values change
            if(gData.length!=guestData.length){
                setGData(gData);
                setGDates(allDates);
            }
        });
        
        
    });
    
    // console.log(numGuests);
    const selectDate = (value, event) =>{
        setCDate(value);
    }
    const unFocus = () => {
        setCDate("");
    }

    
    return(
        <div>
            <InfoSubHeader eName = {data[1]} cName = {data[0]}/>
            <div className="planner-cont" onClick = {unFocus}>
                <Calendar 
                // className = "react-calendar"
                calendarType = "US" 
                minDate = {new Date(data[2]+"T00:00")} 
                maxDate = {new Date(data[3]+"T00:00")}
                onChange = {selectDate}
                onClick={(e) => e.stopPropagation()}
                tileClassName={({date})=>{
                    var d = new Date(date);
                    let i = (d-new Date(data[2]+"T00:00"))/86400000;
                    console.log("test");
                    if(i>=0&&i<guestDates.length){
                        // on first render allData[i] would be undefined
                        console.log("test2");
                        if(guestDates[i].length==guestData.length){
                            return "greenHighlight";
                        }
                        else if (guestDates[i].length>=guestData.length/2){
                            return "yellowHighlight";
                        }
                        else if (guestDates[i].length>0){
                            return "redHighlight";
                        }
                    }
                    // return "greenHighlight";
                }}
                />
                <GuestInfo gData = {guestData} dateIndex = {guestDates} selDate = {cDate}/>
            </div>
            
        </div>
        
    )
}

export default Planner;