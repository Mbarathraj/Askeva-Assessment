import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";

import Employees from "../pages/Employees";

import AddEmployee from "../pages/AddEmployee";

import EditEmployee from "../pages/EditEmployee";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees"
                element={
                    <ProtectedRoute>
                        <Employees />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees/add"
                element={
                    <ProtectedRoute>
                        <AddEmployee />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employees/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditEmployee />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}