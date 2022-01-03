import {useState} from 'react';

const DayDiv = ({date, cWeek}) => {
    const [selected, setSelected] = useState(false);
    const [allDay, setAllDay] = useState(false);
    const [sTime, setSTime] = useState("");
    const [eTime, setETime] = useState("");

    // console.log(cWeek, eTime);

    
    const tempDates = JSON.parse(localStorage.getItem('dates'));
    
    let index = date.getDay();
    // if(cWeek==2){
    //     console.log(eTime);
    // }
    // everytime the page refreshes make sure the selected state is preserved
    if(selected!=tempDates[cWeek-1][index].selected){
        setSelected(tempDates[cWeek-1][index].selected);
    }
    if(allDay!=tempDates[cWeek-1][index].allDay){
        setAllDay(tempDates[cWeek-1][index].allDay);
    }
    if(sTime!=tempDates[cWeek-1][index].sTime){
        setSTime(tempDates[cWeek-1][index].sTime);
    }
    if(eTime!=tempDates[cWeek-1][index].eTime){
        setETime(tempDates[cWeek-1][index].eTime);

    }
    
    const onSelectDay = () => {
        const tempDates = JSON.parse(localStorage.getItem('dates'));
        var updatedDates = tempDates.map((tempDate,i) =>
                {if(i == cWeek-1){
                    tempDate[index].selected=!selected;
                }
                return tempDate;
        });
        localStorage.setItem('dates',JSON.stringify(updatedDates));
        setSelected(!selected);
    };

    const onAllDay = (e) =>{
        const tempDates = JSON.parse(localStorage.getItem('dates'));
        var updatedDates = tempDates.map((tempDate,i) =>
                {if(i == cWeek-1){
                    tempDate[index].allDay=!allDay;
                }
                return tempDate;
        });
        localStorage.setItem('dates',JSON.stringify(updatedDates));
        setAllDay(!allDay);

        //stops the day div element from acting on the click
        e.stopPropagation();
    }

    const updateSTime = (e) => {
        console.log(cWeek);
        if(e.target.value!=sTime){
            
            const tempDates = JSON.parse(localStorage.getItem('dates'));
            var updatedDates = tempDates.map((tempDate,i) =>
                    {if(i == cWeek-1){
                        tempDate[index].sTime=e.target.value;
                    }
                    return tempDate;
            });
            localStorage.setItem('dates',JSON.stringify(updatedDates));
            setSTime(e.target.value);
        }
    }
    const updateETime = (e) => {
        let test = e.target.value;
        console.log(cWeek);
        if(test!=eTime){
            
            const tempDates = JSON.parse(localStorage.getItem('dates'));
            var updatedDates = tempDates.map((tempDate,i) =>
                    {if(i == cWeek-1){
                        tempDate[index].eTime=test;
                    }
                    return tempDate;
            });
            localStorage.setItem('dates',JSON.stringify(updatedDates));
            console.log(cWeek);
            setETime(test);
        }
    }

    return(
        <div className = {selected?"dayDivStyle selected":"dayDivStyle"} onClick ={onSelectDay} >
            <div className="timeDivStyle" >
                {/* <input type = 'checkbox' className = "dateCheck"/> */}
                <div className = "dateInfoStyle">
                    <div className = "dayStyle">
                        {date.toLocaleString('en-US',{weekday: 'long'})}
                    </div>
                    <div className = "dateStyle">
                        {date.toLocaleString('en-US',{year: 'numeric', month: 'short', day: 'numeric'})}
                    </div>
                </div>
            </div>
            <div className="timeDivStyle">
                <button onClick={onAllDay} type = "button" className = {allDay?"button selectedWeek":"button selectWeek"}> All Day</button>
                {/* <input type = 'checkbox' className = "applyCheck" onClick={(e) => e.stopPropagation()}/>
                <label className = "applyStyle">All Day</label> */}
            </div>
            
            <div className="timeDivStyle rEnd"> 
                <div>
                    <div className = "applyStyle">
                        {"From:"}
                    </div>
                    <div>
                    <input type = 'time' className="timeInputStyle" onBlur={updateSTime} onClick={(e) => e.stopPropagation()} />
                    </div>
                </div>
                {/* <i className="fas fa-plus-circle"></i> */}
                <div>
                    <div className = "applyStyle">
                        {"To:"}
                    </div>
                    <div>
                    <input type = 'time'  defaultValue = {eTime} className="timeInputStyle"  onBlur = {updateETime} onClick={(e) => e.stopPropagation()}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
const EmptyDay = () => {
    return (
        <div className="emptyDayStyle">

        </div>
    )
}
const DaysDiv = ({sDate, eDate, cWeek}) => {
    let cDate = new Date(sDate);
    
    console.log("test");
    
    // console.log(newDate.getDay());
    let i = 0;
    // first week might not start on a Sunday
    if (cWeek == 1){
        cDate.setDate(cDate.getDate()-sDate.getDay());
    }
    else{
        cDate.setDate(cDate.getDate()+(7-cDate.getDay()+((cWeek-2)*7)));
    }
    // var i = sDate.getDay();
    var datesArray = []
    // var listofdates = []

    for(; i<7; i++){
        if(cDate<=eDate&&cDate>=sDate){
            datesArray.push(<DayDiv key = {cDate.toString()} date = {new Date(cDate)} cWeek = {cWeek}/>);
            
        }
        else{
            datesArray.push(<EmptyDay/>);
        }
        cDate.setDate(cDate.getDate()+1);
    }
    
    // datesArray.push(<DayDiv date = {new Date(newDate)} cWeek = {cWeek}/>);
    
    

    // datesArray.push(<DayDiv date = {newDate}/>);
    
    return(
        <div className="allDaysDiv">
            {datesArray}
        </div>
    )
}

export default DaysDiv