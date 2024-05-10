import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <nav>
                <ul>
                    <li><Link to="/reservations">Reservations Dashboard</Link></li>
                    <li><Link to="/users">Users Dashboard</Link></li>
                    <li><Link to="/equipment">Equipment Dashboard</Link></li>
                    <li><Link to="/rooms">Rooms Dashboard</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default MainPage;
