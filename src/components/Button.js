import './Home.css';

const Button = (props) => {
    return(
        <button type={props.type} className={props.class}>
            {props.children}
        </button>
    )
}

export default Button;