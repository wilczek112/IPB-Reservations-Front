import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import '../../index.css';

const MainPage = () => {
    return (
        <div className="bg-blue-500 p-6">
            <header className="text-white text-3xl mb-4">
                <Link to="/" className="hover:underline">Activity and space reservation developer panel</Link>            </header>
            <h1 className="text-white text-2xl mb-4">Welcome to developer panel</h1>
            <nav>
                <ul className="space-y-4">
                    <li><Link to="/developer/reservations" className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white py-2 px-4 rounded-full">Reservations Dashboard</Link></li>
                    <li><Link to="/developer/users" className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white py-2 px-4 rounded-full">Users Dashboard</Link></li>
                    <li><Link to="/developer/equipment" className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white py-2 px-4 rounded-full">Equipment Dashboard</Link></li>
                    <li><Link to="/developer/rooms" className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white py-2 px-4 rounded-full">Rooms Dashboard</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default MainPage;

