import TopBar from "@/components/my-info/TopBar";
import { useAuthStore } from "@/context/useAuthStore";
import { Outlet, useParams } from "react-router-dom";

export const EmployeeInfoLayout = () => {

    const { employeeId } = useParams();

    const { loading } = useAuthStore()

    if (loading) return <div>Loading...</div>

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
            <TopBar
                routes={TopBarRoutes}
            />
            <div className="mt-7">
                <Outlet />
            </div>
        </div>
    )
}
