import { useGetProfiles } from "@/api/profiles/use-get-profiles";
import { DepartmentColumnData } from "@/components/departments/department-data-coloums";
import { DepartmentDataTable } from "@/components/departments/department-data-table";
import { AddNewProfile } from "@/components/profiles/add-new-profile";

export const ProfilesPage = () => {
    const { data, isLoading } = useGetProfiles()

    if (isLoading) {
        return null
    }

    return (
        <main className="w-full h-full font-urbanist pt-6 flex flex-col gap-y-4">
            <div className="flex justify-between">
                <h2 className="text-black font-semibold text-2xl">Profiles</h2>
                <AddNewProfile />
            </div>
            <div>
                <DepartmentDataTable
                    columns={DepartmentColumnData}
                    data={data}
                />
            </div>
        </main>
    );
};
