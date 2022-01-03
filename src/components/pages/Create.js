import Button from '../Button';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import Axios from "axios";

const Create = () => {
    // const createData=[
    //     fName:'',
    //     lName:'',

    // ](
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [eName, setEName] = useState("");
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");
    const [created, setCreated] = useState(0);
    const [code, setCode] = useState("");

    const handleSubmit = (e) =>{
       
        e.preventDefault();

        Axios.post("http://localhost:3001/api/create_event/", 
        {firstName:fName , lastName:lName, eventName:eName, startDate:sDate, endDate:eDate})
        .then((res)=>{
            console.log(res.data);
            setCode(res.data);
        });
        setCreated(1);
        console.log(code);
    }
    console.log(code);
    switch (created){
        case 1:
            return(
                <div className = "codeContainer">
                    <p>Use the following code to join the event:</p>
                    <div className="codeStyle">{code}</div>
                    <Link to='/join'>
                        <Button type="button" class="button home">
                            Join Event
                        </Button>
                    </Link>
                </div>
            )
        default:
            return(
                <form className="formContainer" onSubmit={handleSubmit}>
                    <div className="formStyle">
                        <label className="formLabel">First Name:</label>
                        <input type="text" id = "FirstName" onChange={(e)=>{setFName(e.target.value)}}></input>
        
                        <label className="formLabel">Last Name:</label>
                        <input type="text" onChange={(e)=>{setLName(e.target.value)}}></input>
        
                        <label className="formLabel">Event Name:</label>
                        <input type="text" onChange={(e)=>{setEName(e.target.value)}}></input>
        
                        <label className="formLabel">Date Range:</label>
                        <div className="fDates">
                            <input type="date" className="dateInput" onChange={(e)=>{setSDate(e.target.value)}}></input>
                            <label className="formSubLabel">to</label>
                            <input type="date" className ="dateInput" onChange={(e)=>{setEDate(e.target.value)}}></input>
                        </div>
                        
                    </div>
                    <div className="fButtons">
                        <Link to ='/'><Button type="button" class="button create">Back</Button></Link>
                        <Button type="submit" class="button create"> Submit</Button>
                    </div>
                    
                </form>
                
            )
    }
    
}

export default Create;