// import './Home.css';

const DayView = (props) => {
    return(
        <button type={props.type} className={props.class}>
            {props.children}
        </button>
    )
}

export default DayView;