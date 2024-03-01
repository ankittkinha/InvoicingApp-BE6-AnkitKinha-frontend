import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("access_token"); // Or your auth check logic

    if (!isAuthenticated) {
        // User not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

