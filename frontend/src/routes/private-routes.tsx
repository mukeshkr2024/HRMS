import { useAuthStore } from "@/context/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const { employee, loading, checkAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (loading) return <div className="min-h-screen w-full flex items-center justify-center">
        <Loader
            className="animate-spin text-muted-foreground"
        />
    </div>

    return (
        employee ? <Outlet /> : <Navigate to="/login" />
    )
}