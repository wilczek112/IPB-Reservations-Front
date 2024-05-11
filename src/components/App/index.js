import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../Login';
import MainPage from '../MainPage';
import DashboardReservations from '../DashboardReservations';
import DashboardRooms from '../DashboardRooms';
import DashboardEquipment from '../DashboardEquipment'; // Keep DashboardEquipment
import DashboardUsers from '../DashboardUsers'; // Import DashboardUsers

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/reservations" element={isAuthenticated ? <DashboardReservations/> :
                    <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/rooms"
                       element={isAuthenticated ? <DashboardRooms/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/equipment"
                       element={isAuthenticated ? <DashboardEquipment/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/users"
                       element={isAuthenticated ? <DashboardUsers/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/crud-app"
                       element={isAuthenticated ? <MainPage/> : <Login setIsAuthenticated={setIsAuthenticated}/>}/>
            </Routes>
        </Router>
    );
};

export default App;
