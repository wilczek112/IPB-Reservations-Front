import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import Swal from "sweetalert2";
import bcrypt from 'bcryptjs';
import ActiveUser from '../App/ActiveUser';



function ProfilePage() {
    const localuser = ActiveUser.getUser();
    const [user, setUser] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const fetchData = async () => {
        const response = await fetch('http://localhost:8000/user/email/wilk.o@o2.pl');
        const data = await response.json();
        setUser(data);
    };

    // Fetch user data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Old password is incorrect.',
                showConfirmButton: true,
            });
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

        const response = await fetch(`http://localhost:8000/user/cph/wilk.o@o2.pl`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                old_password: user.password, // send the old password (hashed)
                new_password: hashedNewPassword, // send the new password (already hashed)
            }),
        });

        if (response.ok) {
            // If update was successful, clear the password fields
            setOldPassword('');
            setNewPassword('');

            // Fetch user data again
            fetchData();

            Swal.fire({
                icon: 'success',
                title: 'Password Changed!',
                text: `Your password has been changed successfully.`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to change password.',
                showConfirmButton: true,
            });
        }
    };


    if (!user) return null;

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
                <label className="block">
                    <span className="text-gray-700">First Name</span>
                    <input type="text" value={user.name} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Last Name</span>
                    <input type="text" value={user.surname} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Email Address</span>
                    <input type="email" value={user.email} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Professor ID</span>
                    <input type="text" value={localuser.professorId} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Old Password</span>
                    <input type="password" value={oldPassword} onChange={handleOldPasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">New Password</span>
                    <input type="password" value={newPassword} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Role</span>
                    <input type="text" value={user.role} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ProfilePage;
