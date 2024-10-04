import { MyInfoCard } from "@/components/card/my-infocard";
import { useAuthStore } from "@/context/useAuthStore";
import TopBar from "@/features/my-info/components/TopBar";
import { Outlet } from "react-router-dom";
import { CustomLoader } from "../shared/custom-loader";

const commonRoutes = [
    {
        label: "Personal",
        href: "/my-info",
    },
    {
        label: "Assets",
        href: "/assets",
    },
    {
        label: "Goals",
        href: "/goals",
    },
];

const employeeOrLeadExtraRoutes = [
    {
        label: "Assessments",
        href: "/assessments",
    },
];

export const MyInfoLayout = () => {
    const { employee, loading } = useAuthStore();

    if (loading) return <CustomLoader />;

    const { role } = employee || {};

    const routes =
        role === "admin" || role === "lead"
            ? [...commonRoutes, ...employeeOrLeadExtraRoutes]
            : commonRoutes;

    return (
        <div>
            <TopBar routes={routes} />
            <div className="mt-7">
                {employee &&
                    <MyInfoCard employee={employee} />
                }
            </div>
            <div className="mt-6">
                <Outlet />
            </div>
        </div>
    );
};
