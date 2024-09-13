import { Navbar } from "@/components/dashboard/navbar"
import { DashboardSideBar } from "@/components/dashboard/sidebar"
import { Footer } from "@/components/footer"
import { Outlet } from "react-router-dom"

export const DashboardLayout = () => {
    return (
        <div className="h-full w-full flex justify-between min-h-screen flex-col">
            <div className="w-full flex h-full">
                <DashboardSideBar />
                <div className="w-full ml-[280px]  pl-10 pr-16">
                    <div className="fixed z-50 pl-[280px] left-0 top-0 w-full pr-16">
                        <Navbar />
                    </div>
                    <main className="mt-20 min-h-[400px]">
                        <Outlet />
                    </main>
                </div>
            </div>

            <Footer />
        </div>

    )
}   
