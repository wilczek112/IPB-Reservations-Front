import React, {useState, useContext, useEffect} from 'react';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import ActiveUser from '../Authentication/ActiveUser';
import {AuthContext} from "../Authentication/AuthContext";
import {Navigate} from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const userResponse = await axios.get(`http://localhost:8000/user/email/${emailInput}`);
      const user = userResponse.data;

      if (user && bcrypt.compareSync(password, user.password)) {
        const tokenResponse = await axios({
          method: 'post',
          url: 'http://localhost:8000/user/token',
          data: `username=${user.email}&password=${user.password}`,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        ActiveUser.setUser({
          email: user.email,
          role: user.role,
          professorId: user.email.split('@')[0],
        });


        Cookies.set('token', tokenResponse.data.access_token, { expires: 1, sameSite: 'None', secure: true });

        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', true);
            setIsAuthenticated(true);

            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!',
              showConfirmButton: false,
              timer: 1500,
            });

            if (user.role === 'admin') {
              window.location.href = '/admin';
            } else if (user.role === 'developer'){
              window.location.href = '/developer';
            } else {
              window.location.href = '/';
            }
          },
        });
      } else {
        setError('Incorrect email or password.');
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Incorrect email or password.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      setError(`Error logging in: ${error.message}`);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error logging in: ${error.message}`,
        showConfirmButton: true,
      });
    }finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to Activity and Space Reservation portal!
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;