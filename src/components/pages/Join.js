import Button from '../Button';
import {Link, Redirect} from 'react-router-dom';
import { useContext, useState } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { EventContext} from "../EventContext";


const Join = (props) => {
    
    let history = useHistory();
    var eventData = [];
    var auth = 0;
    var updatedData = ['','','','',auth];
    localStorage.setItem('data',JSON.stringify(updatedData));
    const [enteredCode, setEnteredCode] = useState("");
    const [gName, setGName] = useState("");
    
    
    // const {data, setData} = useContext(EventContext);
    // console.log(data);
    
    // if (data!=[]){
    //     auth = data[2];
    // }
   
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        Axios.get("http://localhost:3001/events",{ params: { code: enteredCode } })
        .then((res)=>{
            
            eventData = res.data
            auth = 1;
            // console.log(auth);
            updatedData = [eventData.firstName+" "+eventData.lastName,eventData.eventName,eventData.startDate,eventData.endDate,auth,enteredCode,gName];
            localStorage.setItem('data',JSON.stringify(updatedData));
            localStorage.removeItem('dates');
            // localStorage.set('');
            // setData(updatedData);
            
            // console.log(data);
            history.push('/event');
        });
        // console.log(eventData.firstName);
        
    }
    // const joinForm = 

    return(
        <form className="formContainer" onSubmit={handleSubmit}>
            <div className="formStyle">
                <label className="formLabel">Event Code:</label>
                <input type="text" onChange={(e)=>{setEnteredCode(e.target.value)}}></input>
                <label className="formLabel">Your Name:</label>
                <input type="text" onChange={(e)=>{setGName(e.target.value)}}></input>
            </div>
            <div className="fButtons">
                <Link to ='/'><Button type="button" class="button create">Back</Button></Link>
                <Button type="submit" class="button create"> Submit</Button>
            </div>
            
        </form>
    )
}

export default Join;