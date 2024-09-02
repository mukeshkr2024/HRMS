import { MyInfoCard } from "@/components/card/my-infocard"
import TopBar from "@/components/my-info/TopBar"
import { Outlet } from "react-router-dom"

export const MyInfoLayout = () => {
    return (
        <div>
            <TopBar />
            <div className="mt-7">
                <MyInfoCard />
            </div>
            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    )
}
