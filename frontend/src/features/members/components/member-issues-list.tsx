import { useGetAssetIssues } from "@/features/assets/api/issues/use-get-assets";
import { DepartmentDataTable } from "@/features/departments/components/department-data-table";
import { ArrowLeft, Loader } from "lucide-react";
import { memberColumnData } from "./columns";
import { Link, useParams } from "react-router-dom";

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
            <div className="flex flex-col gap-y-2">
                <Link
                    to="/members"
                    className="flex items-center gap-1 font-medium hover:text-slate-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                </Link>{" "}
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
