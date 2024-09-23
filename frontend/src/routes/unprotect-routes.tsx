import { CustomLoader } from "@/components/shared/custom-loader";
import { useAuthStore } from "@/context/useAuthStore"
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UnprotectedRoutes = () => {
    const { employee, loading, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (loading) return <CustomLoader />

    return (
        employee ? <Navigate to="/" /> : <Outlet />
    )
}