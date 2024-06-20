import React, {useState, useContext, useEffect} from 'react'; // import useContext
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import ActiveUser from '../App/ActiveUser';

const Login = ({ setIsAuthenticated }) => {
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async e => {
    e.preventDefault();

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
          _id: user._id,
          name: user.name,
          surname: user.surname,
          role: user.role,
          email: user.email,
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

            // Redirect user based on their role
            if (user.role === 'admin') {
              window.location.href = '/admin';
            } else {
              window.location.href = '/search';
            }
          },
        });
      } else {
        setError('Incorrect email or password.'); // set error message here
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Incorrect email or password.',
              showConfirmButton: true,
            });
          },
        });
      }
    } catch (error) {
      setError(`Error logging in: ${error.message}`); // set error message here
      console.error('Error logging in: ', error);
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
                    value={emailInput} // use emailInput here
                    onChange={e => setEmailInput(e.target.value)} // use setEmailInput here
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

            {/* Display the error message */}
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
