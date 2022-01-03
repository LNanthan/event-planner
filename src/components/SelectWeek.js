import { useState } from "react";


const WeekLabel = (props) => {
    const [isSelected, setSelected] = useState(false);

    if (props.numWeek!=props.selectedWeek && isSelected){
        setSelected(false);
    }
    else if(props.numWeek==props.selectedWeek && !isSelected){
        setSelected(true);
    }

    const clickWeek = () =>{
        // setSelected(!isSelected);
        props.onSelectWeek(props.numWeek);
    }
    return(
        <button type = "button" className = {isSelected?"button selectedWeek":"button selectWeek"} onClick={clickWeek}>
            {"W"+props.numWeek}
        </button>
    )
}

const WeeksSpan = ({numWeeks, onSelectWeek}) => {
    var weeks = []
    const [sWeek, setSWeek] = useState(1);

    const handleSelection = (numWeek) =>{
        if (sWeek!=numWeek){
            setSWeek(numWeek);
        }
        onSelectWeek(numWeek);
    }
    for (let i = 0; i < numWeeks; i++) {
        weeks.push(<WeekLabel numWeek = {i+1} onSelectWeek = {handleSelection} selectedWeek = {sWeek}/>);
        
    }
    return(
        <span >
            {weeks}
        </span>
    )
}

const SelectWeek = ({onSelectWeek, numWeeks, applyWeek}) => {
    // console.log(nWeeks);
    return(
        <div className= "weekDiv">
            <div>
                {/* <span className = "weekArrow">{"<"}</span> */}
                <WeeksSpan numWeeks = {numWeeks} onSelectWeek = {onSelectWeek}/>
                {/* <span className = "weekArrow">{">"}</span> */}
            </div>
            <div className = "applyStyle">
                <button type = "button" onClick={applyWeek} className = {"button"}> Apply to All Weeks</button>
                {/* <input type = 'checkbox' className = "applyCheck" onClick={applyWeek}/>
                <label>Apply to all weeks</label> */}
            </div>
        </div>
    )
}

export default SelectWeek
