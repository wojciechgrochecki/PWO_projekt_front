import React from 'react';
import { useAuth } from '../auth';
import { Outlet } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';
import Navigation from '../../components/Navigation'


export default function ProtectedRoute() {
    const { token } = useAuth();

    if (!token) {
        return <LoginForm />;
    }

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
};

