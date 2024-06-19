import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

function Header() {
    return (
        <header className="bg-blue-500 text-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/search" className="font-bold text-xl hover:text-blue-200 transition duration-200 ease-in-out">
                    Activities and Space Reservation
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/search" className="px-3 py-2 bg-white text-blue-500 rounded hover:bg-blue-200">Search</Link>
                        </li>
                        <li>
                            <Link to="/reservations" className="px-3 py-2 bg-white text-blue-500 rounded hover:bg-blue-200">Reservation</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="px-3 py-2 bg-white text-blue-500 rounded hover:bg-blue-200">Profile</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
