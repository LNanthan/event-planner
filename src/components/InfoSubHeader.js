import {Link, Redirect} from 'react-router-dom';
const InfoSubHeader = (props) => {
    return(
        <div className = "infoDiv">
            <span className = "infoStyle">{"Event: "+props.eName}</span>
            <span className = "infoStyle">{"Created by: "+props.cName}</span>
        </div>
    )
}

export default InfoSubHeader