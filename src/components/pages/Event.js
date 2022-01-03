import InfoSubHeader from "../InfoSubHeader";
import SelectWeek from '../SelectWeek';
import DaysDiv from '../Days';
import { useHistory } from "react-router-dom";
import {Link, Redirect} from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { EventContext} from "../EventContext";
import Button from "../Button";
import Axios from "axios";



const Event = () => {
    const [cWeek, setCWeek]= useState(1);
    
    const changeWeek = (numWeek) => {
        setCWeek(numWeek);
        
    }
   
    let history = useHistory(); 
    const data = JSON.parse(localStorage.getItem('data'));

    if (data[4]==0 || data.length==0){
        history.push('/join');
    }
    
    const startDate = new Date(data[2]+"T00:00");
    // startDate.setDate(startDate.getDate()+1);
    const endDate = new Date(data[3]+"T00:00");
    // endDate.setDate(endDate.getDate()+1);

    let cDate = new Date(startDate);
    cDate.setDate(cDate.getDate()-startDate.getDay());
    let nWeeks = Math.ceil(((endDate-startDate)/86400000+1)/7);
    // console.log((endDate-startDate)/86400000);

    if(localStorage.getItem('dates')==null){
        var allDates = [];
        for(let i =0; i<nWeeks; i++){
            allDates.push([]);
            // var cWeekDays = 7-cDate.getDay();
            for(let x = 0;x<7;x++){
                if(cDate<=endDate&&cDate>=startDate){
                    allDates[i][x]={
                        "date" : (new Date(cDate)).toString(),
                        "selected" : false,
                        "allDay" : false,
                        "sTime" : "",
                        "eTime" :""
                    };
                }
                else{
                    allDates[i][x]={};
                }
                cDate.setDate(cDate.getDate()+1);
            }
        }
        localStorage.setItem("dates",JSON.stringify(allDates));
    }
    
    
    

    const applyToWeeks = () =>{
        const allDates = JSON.parse(localStorage.getItem('dates'));
        // gets the days for the current week
        const cWDates = allDates.slice(cWeek-1,cWeek);
        // console.log(cWDates[0][0]);
        // let x = new Date(cWDates[0][0].date)
        // x=x.getDay();
        var updatedDates = allDates.map((allDate,i) =>
                {if(i!= cWeek-1){
                    for(let r =0;r<=6;r++){
                        if(allDate[r].date!=undefined && cWDates[0][r].date!=undefined){
                            allDate[r].selected = cWDates[0][r].selected;
                            allDate[r].allDay = cWDates[0][r].allDay;
                            allDate[r].sTime = cWDates[0][r].sTime;
                            allDate[r].eTime = cWDates[0][r].eTime;
                        }
                        
                    };
                }
                return allDate;
        });
        localStorage.setItem('dates',JSON.stringify(updatedDates));

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('data'));
        const allWeeks = JSON.parse(localStorage.getItem('dates'));
        const allDates = []
        allWeeks.forEach(el => { 
            el.forEach(date => {
                // trim off the placeholder values used for creating the Day Div
                if (date.date!=undefined){
                    allDates.push(date)
                }
            })    
        });
        console.log(allDates);
        Axios.post("http://localhost:3001/api/event_details/", 
        {event_id: data[5] , guestName:data[6], dates:allDates})
        .then((res)=>{
            console.log(res.data)
            history.push('/event/view');
        });
        // console.log(eventData.firstName);
        
    }
    

    return(
        <form onSubmit={handleSubmit}>
            <InfoSubHeader eName = {data[1]} cName = {data[0]}/>
            <div className="infoCont">
                <Link to ='/event/view' className="linkStyle">View Event Calendar</Link>
            </div>
            <SelectWeek numWeeks = {nWeeks} onSelectWeek = {changeWeek} applyWeek = {applyToWeeks}/>
           
            <DaysDiv sDate = {startDate} eDate = {endDate} cWeek = {cWeek}/>
            <div className="eventFButtons">
                {/* <Link to ='/'><Button type="button" class="button create">Back</Button></Link> */}
                <Button type="submit" class="button create"> Submit</Button>
            </div>
        </form>
        
    )

    
}

export default Event;