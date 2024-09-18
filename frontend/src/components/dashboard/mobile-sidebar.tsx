import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "@/utils/cn";
import { Briefcase, FileBarChart, LayoutGrid, Menu, Monitor, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const MobileSidebar = () => {
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
            label: "Profiles",
            route: "/profiles",
            icon: Users,
        },
        // {
        //     label: "Reports",
        //     route: "/reports",
        //     icon: BarChart3,
        // },
        {
            label: "Documents",
            route: "/documents",
            icon: FileBarChart,
        },
    ];

    const { pathname } = useLocation()


    return (
        <Sheet
        >
            <SheetTrigger
                asChild
                className="md:hidden"
            >
                <Menu />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="flex flex-col h-full"
            >
                <div className="mt-6 flex flex-col gap-y-6">
                    <SheetClose asChild >
                        <Link to="/">
                            <img src="/logo.svg" alt="" className="px-5 w-[50%] mb-6" />
                        </Link>
                    </SheetClose>
                    {
                        sidebarRoutes.map(route => (
                            <SheetClose asChild key={route.label}>
                                <Link to={route.route} className={cn("flex gap-x-4 items-center px-5 py-2 rounded-[37px]", pathname === route.route ? "bg-[#FFFFFF]" : "")}>
                                    <route.icon className={cn("", pathname === route.route ? "text-brand-green" : "")}
                                    //  fill={route.route === pathname ? "#1FBE8E" : ""}
                                    />
                                    <p className={cn("font-normal text-base", pathname === route.route ? "text-brand-green" : "text-primary-text")}>{route.label}</p>
                                </Link>
                            </SheetClose>

                        ))
                    }
                </div>
            </SheetContent>
        </Sheet >

    )
}
