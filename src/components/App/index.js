import React, { useContext } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ActiveUser from '../Authentication/ActiveUser';

import { AuthContext, AuthProvider } from "../Authentication/AuthContext";
import Login from '../Login';
import MainPage from '../MainPage/index';
import DashboardReservations from '../Developer/DashboardReservations';
import DashboardRooms from '../Developer/DashboardRooms';
import DashboardEquipment from '../Developer/DashboardEquipment';
import DashboardUsers from '../Developer/DashboardUsers';
import Profile from '../Profile/Profile';
import Reservations from '../Reservations/Reservations';
import AvailableRooms from '../AvailableRooms/AvailableRooms';
import DashboardAdmin from '../Developer/Panel';
import Admin from '../Admin';

const App = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const user = ActiveUser.getUser();

    if (isLoading) {
        return <img src="/loading_background.jpg" alt="Authorising..." />;
    }

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {isAuthenticated && (
                        <>
                            <Route path="/developer" element={ActiveUser.getUser().role === 'developer' ? <DashboardAdmin/> : <Navigate to="/" />}/>
                            <Route path="/developer/reservations" element={ActiveUser.getUser().role === 'developer' ? <DashboardReservations/> : <Navigate to="/" />}/>
                            <Route path="/developer/rooms" element={ActiveUser.getUser().role === 'developer' ? <DashboardRooms/> : <Navigate to="/" />}/>
                            <Route path="/developer/equipment" element={ActiveUser.getUser().role === 'developer' ? <DashboardEquipment/> : <Navigate to="/" />}/>
                            <Route path="/developer/users" element={ActiveUser.getUser().role === 'developer' ? <DashboardUsers/> : <Navigate to="/" />}/>
                            <Route path="/" element={ActiveUser.getUser().role === 'admin' ? <Navigate to="/admin" /> : <MainPage/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/reservations" element={ActiveUser.getUser().role === 'user' || ActiveUser.getUser().role === 'developer' ? <Reservations/> : <Navigate to="/admin" />}/>
                            <Route path="/availablerooms" element={ActiveUser.getUser().role === 'user' || ActiveUser.getUser().role === 'developer' ? <AvailableRooms/> : <Navigate to="/admin" />}/>
                            <Route path="/admin" element={ActiveUser.getUser().role === 'admin' || ActiveUser.getUser().role === 'developer' ? <Admin/> : <Navigate to="/" />}/>
                        </>
                    )}
                    {!isAuthenticated && (
                        <>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="*" element={<Navigate to="/login" />}/>
                        </>
                    )}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;