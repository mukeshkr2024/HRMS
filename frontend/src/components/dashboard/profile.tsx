import { useAuthStore } from "@/context/useAuthStore"
import { Card } from "../ui/card"
import { Link } from "react-router-dom"
import { UserAvatar } from "../shared/user-avatar"

export const Profile = () => {
    const { employee } = useAuthStore()
    return (
        <Card className="p-5">
            <div className="flex items-center gap-x-12">

                <UserAvatar
                    className="size-[76px]"
                    avatar={employee?.avatar}
                    name={employee?.name}
                />
                <div>
                    <h3 className=" text-black font-semibold text-xl">{employee?.name}</h3>
                    <Link className="text-brand-green font-normal" to="/my-info">View Bio</Link>
                </div>
            </div>
        </Card>
    )
}
