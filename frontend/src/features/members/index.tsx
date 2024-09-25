import { EmployeeDataData } from "@/features/employees/components/employee-data";
import { CustomLoader } from "@/components/shared/custom-loader";
import { useGetMembers } from "./api/use-get-members";
import { memberColumns } from "./columns";

export const TeamMembersPage = () => {
    const { data: members, isLoading } = useGetMembers()

    if (isLoading) {
        return <CustomLoader className="pt-20" />
    }

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between pt-4">
                <h2 className="text-[#000000] font-semibold text-2xl">Team Members</h2>
            </div>
            <div>
                {/* @ts-ignore */}
                <EmployeeDataData columns={memberColumns} data={members} />
            </div>
        </div>
    );
};
