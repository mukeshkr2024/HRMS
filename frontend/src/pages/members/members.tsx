import { useGetEmployees } from "@/api/employee/use-get-employees";
import { EmployeeDataData } from "@/components/employees/employee-data";
import { CustomLoader } from "@/components/shared/custom-loader";
import { memberColumns } from "./columns";

export const TeamMembersPage = () => {
    const { data, isLoading } = useGetEmployees();

    if (isLoading) {
        return <CustomLoader className="pt-20" />
    }

    let employeeData;

    if (data) {

        // Map the real data into the shape expected by Employee type
        employeeData = data?.map((emp: any, idx: number) => ({
            _id: emp?._id,
            serialNumber: idx + 1 || 0,
            firstName: emp.personalInformation.firstName || "N/A",
            lastName: emp.personalInformation.lastName || "N/A",
            positionName: emp.position?.positionName || "Developer",
            createdAt: new Date(emp.hireDate).toLocaleDateString() || "N/A",
            assesment: emp.assessments || [], // Adjust according to your real data structure
            profile: emp.profileImage || "/images/profile.png", // If profile image available
            designation: emp.designation || "Developer",
            location: emp.location || "pune, India",
            type: emp.type || "Full time", // assuming type field in your data
            joiningDate: new Date(emp.hireDate).toLocaleDateString() || "N/A",
            email: emp.email || "N/A",
            phone: emp?.contactInformation?.workPhone || "N/A",
            linkedinUrl: emp.linkedinUrl || "#",
            alternativeNumber: emp?.contactInformation?.homePhone || "N/A",
            avatar: emp?.avatar,
            dob: new Date(emp?.personalInformation?.dateOfBirth).toLocaleDateString() || "N/A",
        })) || []
    }

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between pt-4">
                <h2 className="text-[#000000] font-semibold text-2xl">Team Members</h2>
            </div>
            <div>
                {/* @ts-ignore */}
                <EmployeeDataData columns={memberColumns} data={employeeData} />
            </div>
        </div>
    );
};
