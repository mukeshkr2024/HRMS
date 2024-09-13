import { useGetEmployees } from "@/api/employee/use-get-employees";
import { EmployeeDataData } from "@/components/employees/employee-data";
import { Employee, EmployeeColumnData } from "@/components/employees/employee-data-coloums";
import { Button } from "@/components/ui/button";
import { Loader, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EmployeesPage = () => {
    const { data, isLoading } = useGetEmployees();
    const navigate = useNavigate();

    if (isLoading) {
        return (<div className="h-full pt-20 w-full flex items-center justify-center">
            <Loader
                className="animate-spin text-muted-foreground"
            />
        </div>)
    }

    let employeeData: Employee[] = [];

    if (data) {

        // Map the real data into the shape expected by Employee type
        employeeData = data?.map((emp: any) => ({
            employeeId: emp.employeeNumber || "N/A",
            firstName: emp.personalInformation.firstName || "N/A",
            lastName: emp.personalInformation.lastName || "N/A",
            positionName: emp.position?.positionName || "Developer",
            createdAt: new Date(emp.hireDate).toLocaleDateString() || "N/A",
            assesment: emp.assessments || [], // Adjust according to your real data structure
            profile: emp.profileImage || "/images/profile.png", // If profile image available
            designation: emp.designation || "Developer",
            location: emp.location || "Pune, India",
            type: emp.type || "Full time", // assuming type field in your data
            joiningDate: new Date(emp.hireDate).toLocaleDateString() || "N/A",
            dob: new Date(emp.dob).toLocaleDateString() || "N/A",
            email: emp.email || "N/A",
            phone: emp?.contactInformation?.workPhone || "N/A",
            linkedinUrl: emp.linkedinUrl || "#",
            alternativeNumber: emp?.contactInformation?.homePhone || "N/A",
            avatar: emp?.avatar
        })) || []
    }

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between pt-4">
                <h2 className="text-[#000000] font-semibold text-2xl">People</h2>
                <Button
                    variant="addAction"
                    className="flex gap-2"
                    onClick={() => navigate("/employees/new")}
                >
                    <PlusCircle size={18} /> Add new employee
                </Button>
            </div>
            <div>
                <EmployeeDataData columns={EmployeeColumnData} data={employeeData} />
            </div>
        </div>
    );
};
