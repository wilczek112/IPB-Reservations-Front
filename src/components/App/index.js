import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import Login from '../Login';
import MainPage from '../MainPage/index';
import DashboardReservations from '../DashboardReservations';
import DashboardRooms from '../DashboardRooms';
import DashboardEquipment from '../DashboardEquipment';
import DashboardUsers from '../DashboardUsers';
import Profile from '../Profile/Profile';
import Reservations from '../Reservations/Reservations';
import AvailableRooms from '../AvailableRooms/AvailableRooms';
import DashboardAdmin from '../DashboardAdmin/Panel';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/check-token', {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                });

                setIsAuthenticated(response.status === 200);
            } catch (error) {
                console.error('Error checking token:', error);
                setIsAuthenticated(false);
                Cookies.remove('token');
            }
        };

        checkToken();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/admin/reservations" element={isAuthenticated ? <DashboardReservations/> :
                    <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/reservations" element={isAuthenticated ? <Reservations/> :
                    <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/admin/rooms"
                       element={isAuthenticated ? <DashboardRooms/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/admin/equipment"
                       element={isAuthenticated ? <DashboardEquipment/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/admin/users"
                       element={isAuthenticated ? <DashboardUsers/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/"
                       element={isAuthenticated ? <MainPage/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/profile"
                       element={isAuthenticated ? <Profile/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/search"
                       element={isAuthenticated ? <MainPage/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/availablerooms"
                       element={isAuthenticated ? <AvailableRooms/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/admin"
                       element={isAuthenticated ? <DashboardAdmin/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/login"
                       element={isAuthenticated ? <Login/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
            </Routes>
        </Router>
    );
};

export default App;
