import { useGetDepartments } from "@/api/departments/use-get-departments";
import { AddNewDepartment } from "@/components/departments/add-new-model";
import { DepartmentColumnData } from "@/components/departments/department-data-coloums";
import { DepartmentDataTable } from "@/components/departments/department-data-table";
import { Department } from "@/types";

export const exampleDepartmentData: Department[] = [
    {
        _id: "D001",
        name: "Engineering",
        employees: 45,
        createdAt: "2020-01-15",
        description: "Responsible for software development and infrastructure.",
    },
    {
        _id: "D002",
        name: "Marketing",
        employees: 30,
        createdAt: "2019-09-25",
        description: "Handles market research, advertising, and public relations.",
    },
    {
        _id: "D003",
        name: "Human Resources",
        employees: 20,
        createdAt: "2018-06-10",
        description: "Oversees employee relations, payroll, and recruitment.",
    },
    {
        _id: "D004",
        name: "Finance",
        employees: 15,
        createdAt: "2021-03-12",
        description: "Manages company's financial planning, analysis, and accounting.",
    },
];

export const DepartmentPage = () => {
    const { data, isLoading } = useGetDepartments()

    if (isLoading) {
        return null
    }

    return (
        <main className="w-full h-full font-urbanist pt-6 flex flex-col gap-y-4">
            <div className="flex justify-between">
                <h2 className="text-black font-semibold text-2xl">Departments</h2>
                <AddNewDepartment />
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
