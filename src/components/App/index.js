import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

import ReservationPage from '../MainPage/index';
import Background from '../Background/background';

const App = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const user = ActiveUser.getUser();

    if (isLoading) {
        return <img src="../../loading_background.jpg" alt="Authorising..." />;
    }

    return (
        <AuthProvider>
            <Router>
                <div className="relative min-h-screen">
                    <Background />
                    <div className="relative z-10">
                        <Routes>
                            {isAuthenticated && (
                                <>
                                    <Route path="/developer" element={user.role === 'developer' ? <DashboardAdmin/> : <Navigate to="/" />}/>
                                    <Route path="/developer/reservations" element={user.role === 'developer' ? <DashboardReservations/> : <Navigate to="/" />}/>
                                    <Route path="/developer/rooms" element={user.role === 'developer' ? <DashboardRooms/> : <Navigate to="/" />}/>
                                    <Route path="/developer/equipment" element={user.role === 'developer' ? <DashboardEquipment/> : <Navigate to="/" />}/>
                                    <Route path="/developer/users" element={user.role === 'developer' ? <DashboardUsers/> : <Navigate to="/" />}/>
                                    <Route path="/" element={user.role === 'admin' ? <Navigate to="/admin" /> : <MainPage/>}/>
                                    <Route path="/profile" element={<Profile/>}/>
                                    <Route path="/reservations" element={user.role === 'user' || user.role === 'developer' ? <Reservations/> : <Navigate to="/admin" />}/>
                                    <Route path="/availablerooms" element={user.role === 'user' || user.role === 'developer' ? <AvailableRooms/> : <Navigate to="/admin" />}/>
                                    <Route path="/admin" element={user.role === 'admin' || user.role === 'developer' ? <Admin/> : <Navigate to="/" />}/>
                                </>
                            )}
                            {!isAuthenticated && (
                                <>
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="*" element={<Navigate to="/login" />}/>
                                </>
                            )}

                            {/* Additional routes from the provided App.js structure */}
                            <Route path="/" element={<ReservationPage />} />

                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
