import { useGetAssetIssues } from "@/features/assets/api/issues/use-get-assets";
import { DepartmentDataTable } from "@/features/departments/components/department-data-table";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
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
    const { memberId } = useParams()


    const { data, isLoading } = useGetAssetIssues(memberId)

    if (isLoading) {
        return (<div className="h-full pt-20 w-full flex items-center justify-center">
            <Loader
                className="animate-spin text-muted-foreground"
            />
        </div>)
    }

    return (
        <main className="w-full h-full font-urbanist flex flex-col gap-y-4">
            <h2 className="text-black font-semibold text-2xl">Raised Issues</h2>
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
