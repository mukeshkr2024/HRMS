import { useGetDepartments } from "@/features/departments/api/use-get-departments";
import { departmentColumnData } from "@/features/departments/components/department-data-coloums";
import { DepartmentDataTable } from "@/features/departments/components/department-data-table";
import { AddNewDepartment } from "@/features/profiles/components/add-new-model";
import { Loader } from "lucide-react";

export const DepartmentPage = () => {
    const { data, isLoading } = useGetDepartments();

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
                <h2 className="text-black font-semibold text-2xl">Departments</h2>
                <AddNewDepartment />
            </div>
            <div>
                <DepartmentDataTable
                    columns={departmentColumnData}
                    data={data}
                />
            </div>
        </main>
    );
};
