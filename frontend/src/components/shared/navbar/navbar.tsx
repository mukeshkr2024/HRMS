import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"

import { useAuthStore } from "@/context/useAuthStore"
import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { MobileSidebar } from "./mobile-sidebar"
import { LogOut } from "lucide-react"

interface Route {
    label: string;
    route: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DashboardSideBarProps {
    routes: Route[];
}

export const Navbar = ({ routes }: DashboardSideBarProps) => {
    const { employee } = useAuthStore();

    return (
        <nav className="w-full md:pl-[30%] h-16 bg-white flex justify-between items-center px-5">
            <MobileSidebar
                routes={routes}
            />
            {/* <div className="w-[60%] relative md:flex items-center hidden">
                <div className="absolute left-4 flex items-center">
                    <img src="/icons/search-icon.svg" className="w-5 h-5" alt="Search Icon" />
                </div>
                <Input
                    placeholder="Search..."
                    className="px-5 pl-10 rounded-[28px] w-full placeholder:text-end placeholder:text-[#808080] bg-[#F2F2F2]"
                />
            </div> */}
            <div className="flex gap-x-3 ml-auto">
                <div className="size-[38px] rounded-full flex items-center justify-center bg-[#E5E5E5]">
                    <img src="/icons/setting-icon.svg" className="size-[20px]" />
                </div>
                <div className="size-[38px] rounded-full flex items-center justify-center bg-[#E5E5E5]">
                    <img src="/icons/notification-icon.svg" className="size-[20px]" />
                </div>
                <NavMenuDropdown>
                    <Avatar>
                        <AvatarImage src={employee?.avatar} />
                        <AvatarFallback>{employee?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </NavMenuDropdown>

            </div>
        </nav>
    )
}


const NavMenuDropdown = ({ children }: { children: React.ReactNode }) => {
    const { logout } = useAuthStore();
    const handleLogout = () => {
        // Implement logout logic
        logout()


    }
    return (
        <DropdownMenu
            modal={false}>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}><LogOut className="size-6" /> LogOut</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}