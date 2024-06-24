import React from 'react';
import Logout from '../../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
    return (
        <header className="text-center my-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                Users
            </h1>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-loulou text-melanie hover:bg-hopbush hover:text-white font-bold py-2 px-4 rounded"
                >
                    Add User
                </button>
                <Logout setIsAuthenticated={setIsAuthenticated} />
            </div>
        </header>
    );
};

export default Header;
