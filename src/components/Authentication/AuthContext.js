import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";


// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add this line

    useEffect(() => {
        const checkToken = async () => {
            try {
                Swal.fire({
                    title: '<pre style="color: lime; background-color: black; font-size: 16px;">' +
                        ' ▄▄▄       █    ██ ▄▄▄█████▓ ██░ ██  ▒█████   ██▀███   ██▓  ██████  ██▓ ███▄    █   ▄████\n' +
                        '▒████▄     ██  ▓██▒▓  ██▒ ▓▒▓██░ ██▒▒██▒  ██▒▓██ ▒ ██▒▓██▒▒██    ▒ ▓██▒ ██ ▀█   █  ██▒ ▀█▒\n' +
                        '▒██  ▀█▄  ▓██  ▒██░▒ ▓██░ ▒░▒██▀▀██░▒██░  ██▒▓██ ░▄█ ▒▒██▒░ ▓██▄   ▒██▒▓██  ▀█ ██▒▒██░▄▄▄░\n' +
                        '░██▄▄▄▄██ ▓▓█  ░██░░ ▓██▓ ░ ░▓█ ░██ ▒██   ██░▒██▀▀█▄  ░██░  ▒   ██▒░██░▓██▒  ▐▌██▒░▓█  ██▓\n' +
                        ' ▓█   ▓██▒▒▒█████▓   ▒██▒ ░ ░▓█▒░██▓░ ████▓▒░░██▓ ▒██▒░██░▒██████▒▒░██░▒██░   ▓██░░▒▓███▀▒\n' +
                        ' ▒▒   ▓▒█░░▒▓▒ ▒ ▒   ▒ ░░    ▒ ░░▒░▒░ ▒░▒░▒░ ░ ▒▓ ░▒▓░░▓  ▒ ▒▓▒ ▒ ░░▓  ░ ▒░   ▒ ▒  ░▒   ▒ \n' +
                        '  ▒   ▒▒ ░░░▒░ ░ ░     ░     ▒ ░▒░ ░  ░ ▒ ▒░   ░▒ ░ ▒░ ▒ ░░ ░▒  ░ ░ ▒ ░░ ░░   ░ ▒░  ░   ░ \n' +
                        '  ░   ▒    ░░░ ░ ░   ░       ░  ░░ ░░ ░ ░ ▒    ░░   ░  ▒ ░░  ░  ░   ▒ ░   ░   ░ ░ ░ ░   ░ \n' +
                        '      ░  ░   ░               ░  ░  ░    ░ ░     ░      ░        ░   ░           ░       ░\n' +
                        '</pre>',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    width: '1000px',
                    onOpen: () => {
                        Swal.showLoading();
                    },
                });

                const response = await axios.get('http://localhost:8000/user/check-token', {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                });

                setIsAuthenticated(response.status === 200);
            } catch (error) {
                console.error('Error checking token:', error);
                setIsAuthenticated(false);
                Cookies.remove('token');
            } finally {
                setIsLoading(false);
                Swal.close();
            }
        };

        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
