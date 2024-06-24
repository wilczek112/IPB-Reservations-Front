import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { AuthContext } from '../Authentication/AuthContext';
import ActiveUser from "../Authentication/ActiveUser";

const Logout = () => {
  const { setIsAuthenticated, user } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.value) {
        Cookies.remove('token');

        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            setIsAuthenticated(false);
            if (user !== null) {
              ActiveUser.clearUser();
            }
            window.location.reload();
          },
        });
      }
    });
  };

  return (
      <button
          style={{marginLeft: '12px'}}
          className="muted-button"
          onClick={handleLogout}
      >
        Logout
      </button>
  );
};

export default Logout;
