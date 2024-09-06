import { cn } from "@/utils/cn"
import { BarChart3, Briefcase, FileBarChart, LayoutGrid, Monitor, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"


export const DashboardSideBar = () => {
    const { pathname } = useLocation()


    const sidebarRoutes = [
        {
            label: "Dashboard",
            route: "/",
            icon: LayoutGrid,
        },
        {
            label: "My Info",
            route: "/my-info",
            icon: Monitor,
        },
        {
            label: "People",
            route: "/employees",
            icon: User,
        },
        {
            label: "Departments",
            route: "/departments",
            icon: Briefcase,
        },
        {
            label: "Reports",
            route: "/reports",
            icon: BarChart3,
        },
        {
            label: "Documents",
            route: "/documents",
            icon: FileBarChart,
        },
    ];

    return (
        <div className="w-[280px] bg-secondary px-8 py-8 h-full fixed top-0 left-0">
            <div className="w-full flex items-center justify-center mt-4">
                <img src="/logo.svg" alt="" />
            </div>
            <div className="mt-16 flex flex-col gap-y-6">
                {
                    sidebarRoutes.map(route => (
                        <Link key={route.label} to={route.route} className={cn("flex gap-x-4 items-center px-5 py-2 rounded-[37px]", pathname === route.route ? "bg-[#FFFFFF]" : "")}>
                            <route.icon className={cn("", pathname === route.route ? "text-brand-green" : "")}
                            //  fill={route.route === pathname ? "#1FBE8E" : ""}
                            />
                            <p className={cn("font-normal text-base", pathname === route.route ? "text-brand-green" : "text-primary-text")}>{route.label}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
