import { useAuthStore } from "@/context/useAuthStore";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const { employee, loading, checkAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (loading) return <div>Loading...</div>

    return (
        employee ? <Outlet /> : <Navigate to="/login" />
    )
}