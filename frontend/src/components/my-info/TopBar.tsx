import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { cn } from "@/utils/cn";

export default function TopBar() {

    const { pathname } = useLocation();


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
        <div className="flex gap-x-6 pt-4">{
            TopBarRoutes.map((route) => (
                <Link to={route.href} key={route.href}>
                    <Button variant="outline" className={cn("rounded-[28px] h-8 font-semibold px-7", route.href === pathname ? "bg-[#D8FFF3] hover:bg-[#D8FFF3]" : "")}>{route.label}</Button>
                </Link>
            ))
        }</div>
    )
}
