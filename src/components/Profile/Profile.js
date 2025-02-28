import React, {useState, useEffect, useCallback} from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Header from '../Header/Header';
import '../../index.css';
import bcrypt from 'bcryptjs';
import ActiveUser from '../Authentication/ActiveUser';
import API_URL from "../../api_config";

function ProfilePage() {
    const localuser = ActiveUser.getUser();
    const [user, setUser] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const fetchData = useCallback(async () => {
        const response = await fetch(`${API_URL}/user/email/${localuser.email}`);
        const data = await response.json();
        setUser(data);
    }, [localuser.email]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePasswordChange = async (event) => {
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

        const response = await fetch(`${API_URL}/user/cph/${localuser.email}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                old_password: user.password,
                new_password: hashedNewPassword,
            }),
        });

        if (response.ok) {
            setOldPassword('');
            setNewPassword('');

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
            <form onSubmit={handlePasswordChange} className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
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
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">New Password</span>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block mt-4">
                    <span className="text-gray-700">Role</span>
                    <input type="text" value={user.role} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <button type="submit" className="mt-6 px-4 py-2 bg-loulou text-melanie hover:bg-hopbush rounded w-full">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ProfilePage;
