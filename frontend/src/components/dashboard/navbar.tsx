import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import React from "react"
import { LogOut } from "lucide-react"
import { useAuthStore } from "@/context/useAuthStore"

export const Navbar = () => {
    return (
        <nav className="w-full pl-[30%] bg-white pt-8 flex justify-between">
            <div className="w-[60%] relative flex items-center">
                <div className="absolute left-4 flex items-center">
                    <img src="/icons/search-icon.svg" className="w-5 h-5" alt="Search Icon" />
                </div>
                <Input
                    placeholder="Search..."
                    className="px-5 pl-10 rounded-[28px] w-full placeholder:text-end placeholder:text-[#808080] bg-[#F2F2F2]"
                />
            </div>
            <div className="flex gap-x-3">
                <div className="size-[38px] rounded-full flex items-center justify-center bg-[#E5E5E5]">
                    <img src="/icons/setting-icon.svg" className="size-[20px]" />
                </div>
                <div className="size-[38px] rounded-full flex items-center justify-center bg-[#E5E5E5]">
                    <img src="/icons/notification-icon.svg" className="size-[20px]" />
                </div>

                <NavMenuDropdown>
                    <Avatar>
                        <AvatarImage src="/icons/avatar-icon.svg" />
                        <AvatarFallback>CN</AvatarFallback>
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
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}><LogOut className="size-6" /> LogOut</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}