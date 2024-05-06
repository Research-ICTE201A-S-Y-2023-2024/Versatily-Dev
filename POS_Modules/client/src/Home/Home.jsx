import './Home.css';
import EmptyPageImage from '../assets/img/empty_page.jpg';
import {Link} from 'react-router-dom';

const Home = () => {
    return(
        <>
            <div className="home-message">
                <img className='home-img' src={EmptyPageImage} alt={'EmptyPageImage'} />
                <div className="home-text">
                    This page is currently empty please change the url to <Link to={'http://localhost:3000/dashboard'}>http://localhost:3000/dashboard</Link>
                </div>
            </div>
        </>
    );
}

export default Home;