import React from 'react'
import { Navigate } from 'react-router';

export default function ProtectedRouts({ children }) {
    const token = localStorage.getItem('userToken');

    if (!token) {
        return <Navigate to='/Authentication' replace />
    }

    return children;
}
