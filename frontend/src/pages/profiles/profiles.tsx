import { useGetProfiles } from "@/api/profiles/use-get-profiles";
import { DepartmentDataTable } from "@/components/departments/department-data-table";
import { AddNewProfile } from "@/components/profiles/add-new-profile";
import { ProfileColumnData } from "@/components/profiles/profiles-data-coloums";
import { Loader } from "lucide-react";

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
                    columns={ProfileColumnData}
                    data={data}
                />
            </div>
        </main>
    );
};
