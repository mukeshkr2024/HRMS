import { AddNewProfile } from "@/features/profiles/components/add-new-profile";
import { DepartmentDataTable } from "@/features/departments/components/department-data-table";
import { Loader } from "lucide-react";
import { useGetProfiles } from "./api/use-get-profiles";
import { profileColumnData } from "./components/colums";

export const ProfilesPage = () => {
    const { data, isLoading } = useGetProfiles()

    if (isLoading) {
        return (<div className="h-full pt-20 w-full flex items-center justify-center">
            <Loader
                className="animate-spin text-muted-foreground"
            />
        </div>)
    }

    return (
        <main className="w-full h-full font-urbanist pt-6 flex flex-col gap-y-4">
            <div className="flex justify-between">
                <h2 className="text-black font-semibold text-2xl">Profiles</h2>
                <AddNewProfile />
            </div>
            <div>
                <DepartmentDataTable
                    columns={profileColumnData}
                    data={data}
                />
            </div>
        </main>
    );
};
