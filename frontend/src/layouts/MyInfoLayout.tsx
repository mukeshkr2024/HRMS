import { MyInfoCard } from "@/components/card/my-infocard"
import TopBar from "@/components/my-info/TopBar"
import { useAuthStore } from "@/context/useAuthStore"
import { Outlet } from "react-router-dom"

export const MyInfoLayout = () => {

    const { employee, loading } = useAuthStore()

    if (loading) return <div>Loading...</div>

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
        // {
        //     label: "Training",
        //     href: '/training',
        // },
        // {
        //     label: "To-do",
        //     href: '/tasks',
        // },
        {
            label: "Goals",
            href: "/goals"
        }
    ]
    return (
        <div>
            <TopBar
                routes={TopBarRoutes}
            />
            <div className="mt-7">
                <MyInfoCard
                    employee={employee!}
                />
            </div>
            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    )
}
