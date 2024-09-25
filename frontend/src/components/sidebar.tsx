import { cn } from "@/utils/cn";
import { Link, useLocation } from "react-router-dom";

interface Route {
    label: string;
    route: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DashboardSideBarProps {
    routes: Route[];
}

export const DashboardSideBar = ({ routes }: DashboardSideBarProps) => {
    const { pathname } = useLocation();

    return (
        <div className="w-[280px] bg-secondary px-8 py-8 h-full fixed top-0 left-0 hidden md:block z-50">
            <div className="w-full flex items-center justify-center mt-4">
                <Link to="/">
                    <img src="/logo.svg" alt="Logo" />
                </Link>
            </div>
            <div className="mt-16 flex flex-col gap-y-6">
                {routes.map((route) => (
                    <Link
                        key={route.label}
                        to={route.route}
                        className={cn(
                            "flex gap-x-4 items-center px-5 py-2 rounded-[37px]",
                            pathname === route.route ? "bg-[#FFFFFF]" : ""
                        )}
                    >
                        <route.icon
                            className={cn(
                                pathname === route.route ? "text-brand-green" : ""
                            )}
                        />
                        <p
                            className={cn(
                                "font-normal text-base",
                                pathname === route.route ? "text-brand-green" : "text-primary-text"
                            )}
                        >
                            {route.label}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
