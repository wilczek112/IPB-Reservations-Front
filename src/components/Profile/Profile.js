import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';

function ProfilePage() {
    const [password, setPassword] = useState('********');
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newPassword);
        setPassword(newPassword);
        setNewPassword('');
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
                <label className="block">
                    <span className="text-gray-700">First Name</span>
                    <input type="text" value="John" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Last Name</span>
                    <input type="text" value="Doe" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Email Address</span>
                    <input type="email" value="johndoe@alunos.ibp.pt" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Password</span>
                    <input type="password" value={password} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">New Password</span>
                    <input type="password" value={newPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Role</span>
                    <input type="text" value="Professor" readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ProfilePage;
