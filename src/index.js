import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AuthProvider} from "./components/Authentication/AuthContext";
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
