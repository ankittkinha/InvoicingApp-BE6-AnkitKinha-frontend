import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token"); // Or your auth check logic

    if (!isAuthenticated) {
        // User not authenticated, redirect to login
        return <Navigate to="/user/login" />;
    }

    return children;
};

export default ProtectedRoute;

