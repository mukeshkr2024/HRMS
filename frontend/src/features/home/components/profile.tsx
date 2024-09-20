import { UserAvatar } from "@/components/shared/user-avatar";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/context/useAuthStore";
import { Link } from "react-router-dom";

export const Profile = () => {
    const { employee } = useAuthStore();

    if (!employee) return null;

    return (
        <Card className="p-5 hidden lg:block">
            <div className="flex items-center gap-x-12">
                <UserAvatar
                    className="w-20 h-20"
                    avatar={employee.avatar}
                    name={employee.name}
                />
                <div>
                    <h3 className="text-black font-semibold text-xl">{employee.name}</h3>
                    <Link className="text-brand-green font-normal" to="/my-info">
                        View Bio
                    </Link>
                </div>
            </div>
        </Card>
    );
};
