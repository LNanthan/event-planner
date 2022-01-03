import Button from '../Button';
import {Link} from 'react-router-dom';
// import './Home.css';

const Home = () => {
    return(
        <div className = "buttonCon">
            <Link to='/create'>
                <Button type="button" class="button home">
                    Create Event
                </Button>
            </Link>
            <Link to='/join'>
                <Button type="button" class="button home">
                    Join Event
                </Button>
            </Link>
        </div>
        
    )
}

export default Home;