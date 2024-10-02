import { MyInfoCard } from "@/components/card/my-infocard"
import TopBar from "@/features/my-info/components/TopBar"
import { useAuthStore } from "@/context/useAuthStore"
import { Outlet } from "react-router-dom"
import { CustomLoader } from "../shared/custom-loader"

export const MyInfoLayout = () => {

    const { employee, loading } = useAuthStore()

    if (loading) return <CustomLoader />

    const TopBarRoutes = [
        {
            label: 'Personal',
            href: '/my-info',
        },
        // {
        //     label: "Time off",
        //     href: '/time-off',
        // }, 
        {
            label: "Assets",
            href: '/assets',
        },
        {
            label: "Goals",
            href: "/goals"
        },
        {
            label: "Feedback",
            href: "/feedback"
        }
    ]
    return (
        <div>
            <TopBar
                routes={TopBarRoutes}
            />
            <div className="mt-7">
                <MyInfoCard
                    // @ts-ignore
                    employee={employee!}
                />
            </div>
            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    )
}
