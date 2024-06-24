import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import '../../index.css';

const MainPage = () => {
    return (
        <div className="bg-melanie p-6">
            <header className="text-loulou text-3xl mb-4">
                <Link to="/" className="hover:underline">IPB Reservations</Link>
            </header>
            <h1 className="text-tapestry text-2xl mb-4">Welcome to developer panel</h1>
            <nav>
                <ul className="space-y-6"> {/* Zmieniono space-y-4 na space-y-6 */}
                    <li>
                        <Link
                            to="/developer/reservations"
                            className="bg-loulou text-melanie hover:bg-hopbush hover:text-white py-2 px-4 rounded-full"
                        >
                            Reservations Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/developer/users"
                            className="bg-loulou text-melanie hover:bg-hopbush hover:text-white py-2 px-4 rounded-full"
                        >
                            Users Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/developer/equipment"
                            className="bg-loulou text-melanie hover:bg-hopbush hover:text-white py-2 px-4 rounded-full"
                        >
                            Equipment Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/developer/rooms"
                            className="bg-loulou text-melanie hover:bg-hopbush hover:text-white py-2 px-4 rounded-full"
                        >
                            Rooms Dashboard
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MainPage;
