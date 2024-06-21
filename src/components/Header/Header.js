import React from 'react';
import { Link } from 'react-router-dom';
import Logout from "../Logout";
import ActiveUser from '../Authentication/ActiveUser';
import '../../index.css';

function Header({ setIsAuthenticated }) {
    const user = ActiveUser.getUser();

    return (
        <header className="bg-blue-500 text-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="font-bold text-xl hover:text-blue-200 transition duration-200 ease-in-out">
                    Activities and Space Reservation
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        {user && user.role === 'developer' && (
                            <li>
                                <Link to="/developer" className="px-3 py-2 bg-white text-blue-500 rounded hover:bg-blue-200">Developer Dashboard</Link>
                            </li>
                        )}
                        {user && (user.role === 'developer' || user.role === 'admin') && (
                            <li>
                                <Link to="/admin" className="px-3 py-2 bg-white text-blue-500 rounded hover:bg-blue-200">Admin Dashboard</Link>
                            </li>
                        )}
                        {user && (user.role === 'user' || user.role === 'developer') && (
                            <li>
                                <Link to="/reservations" className="px-3 py-2 bg-white text-blue-500 rounded hover:bg-blue-200">Reservation</Link>
                            </li>
                            )}
                        <li>
                            <Link to="/profile" className="px-3 py-2 bg-white text-blue-500 rounded hover:bg-blue-200">Profile</Link>
                        </li>
                        <li>
                            <Logout setIsAuthenticated={setIsAuthenticated} /> {/* Add the Logout component */}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
