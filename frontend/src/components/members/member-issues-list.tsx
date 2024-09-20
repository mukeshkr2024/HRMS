import { useGetAssetIssues } from "@/api/assets/issues/use-get-assets";
import { DepartmentDataTable } from "@/components/departments/department-data-table";
import { Loader } from "lucide-react";
import { memberColumnData } from "./columns";

export type Issue = {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "processing" | "resolved" | "rejected",
    approval: "pending" | "processing" | "approved" | "rejected",
    createdAt: string;
    type: string;
}

export const MemberIssuesList = () => {
    const { data, isLoading } = useGetAssetIssues()

    console.log(data);


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
                <h2 className="text-black font-semibold text-2xl">Raised Issues</h2>
            </div>
            <div>
                <DepartmentDataTable
                    // @ts-ignore
                    columns={memberColumnData}
                    data={data}
                />
            </div>
        </main>
    );
};
