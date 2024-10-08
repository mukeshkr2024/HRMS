import { DashboardSideBar } from "@/components/sidebar";
import { Footer } from "@/components/footer";
import { useAuthStore } from "@/context/useAuthStore";
import { Briefcase, FileBarChart, Inbox, LayoutGrid, Monitor, User, UserPen, Users } from "lucide-react";
import { Outlet, Route } from "react-router-dom";
import { Navbar } from "../shared/navbar/navbar";

interface Route {
    label: string;
    route: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const DashboardLayout = () => {
    const { employee } = useAuthStore();
    const adminRoutes: Route[] = [
        { label: "Dashboard", route: "/", icon: LayoutGrid },
        { label: "Inbox", route: "/inbox", icon: Inbox },
        { label: "My Info", route: "/my-info", icon: Monitor },
        { label: "People", route: "/employees", icon: User },
        { label: "Team Members", route: "/members", icon: Users },
        { label: "Departments", route: "/departments", icon: Briefcase },
        { label: "Profiles", route: "/profiles", icon: UserPen },
        { label: "Documents", route: "/documents", icon: FileBarChart },
    ];
    const publicRoutes: Route[] = [
        { label: "Dashboard", route: "/", icon: LayoutGrid },
        { label: "Inbox", route: "/inbox", icon: Inbox },
        { label: "My Info", route: "/my-info", icon: Monitor },
        { label: "Documents", route: "/documents", icon: FileBarChart },
    ];

    const leadRoutes: Route[] = [
        { label: "Dashboard", route: "/", icon: LayoutGrid },
        { label: "Inbox", route: "/inbox", icon: Inbox },
        { label: "Team Members", route: "/members", icon: Users },
        { label: "My Info", route: "/my-info", icon: Monitor },
        { label: "Documents", route: "/documents", icon: FileBarChart },
    ];

    const managerRoutes: Route[] = [
        { label: "Dashboard", route: "/", icon: LayoutGrid },
        { label: "Inbox", route: "/inbox", icon: Inbox },
        { label: "My Info", route: "/my-info", icon: Monitor },
        { label: "Team Members", route: "/members", icon: Users },
        { label: "Documents", route: "/documents", icon: FileBarChart },
    ];

    const routes = employee?.role === "admin"
        ? adminRoutes
        : employee?.role === "lead"
            ? leadRoutes
            : employee?.role === "manager"
                ? managerRoutes
                : publicRoutes;

    return (
        <div className="h-full w-full flex justify-between min-h-screen flex-col">
            <div className="w-full flex h-full">
                <DashboardSideBar routes={routes} />
                <div className="w-full md:ml-[280px]">
                    <div className="fixed z-50 md:pl-[280px] left-0 top-0 w-full">
                        <Navbar routes={routes} />
                    </div>
                    <main className="mt-20 min-h-[400px] px-4 md:px-8">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};
