import TopBar from "@/features/my-info/components/TopBar";
import { useAuthStore } from "@/context/useAuthStore";
import { Link, Outlet, useParams } from "react-router-dom";
import { CustomLoader } from "../shared/custom-loader";
import { ArrowLeft } from "lucide-react";

export const EmployeeInfoLayout = () => {

    const { employeeId } = useParams();

    const { loading } = useAuthStore()

    if (loading) return <CustomLoader />

    const TopBarRoutes = [
        {
            label: 'Personal',
            href: `/employees/${employeeId}`,
        },
        {
            label: "Assets",
            href: `employees/${employeeId}/assets`,
        },
        {
            label: "Goals",
            href: `employees/${employeeId}/goals`
        },
        {
            label: "Documents",
            href: `employees/${employeeId}/documents`
        }
    ]
    return (
        <div>
            <Link
                to="/employees"
                className="flex items-center gap-1 font-medium hover:text-slate-700"
            >
                <ArrowLeft className="h-4 w-4" />
                Go Back
            </Link>{" "}
            <TopBar
                routes={TopBarRoutes}
            />
            <div className="mt-7">
                <Outlet />
            </div>
        </div>
    )
}
