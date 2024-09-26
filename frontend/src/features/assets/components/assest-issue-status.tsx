import { useGetAssetIssues } from "@/features/assets/api/issues/use-get-assets"
import { AddIssueModal } from "./add-issue-model"
import { DataTable } from "./data-table"
import { columns } from "./isssue-colums"
import { CustomLoader } from "../../../components/shared/custom-loader"
import { useParams } from "react-router-dom"

export type Issue = {
    _id: string
    title: string
    description: string
    status: "pending" | "processing" | "success" | "failed",
    approval: "pending" | "processing" | "success" | "failed",
    createdAt: Date
}

export const AssetIssueStatus = () => {

    const { employeeId } = useParams();

    const { data, isLoading } = useGetAssetIssues()

    return (
        <section className="w-full">
            <div className="flex items-center gap-x-10">
                <div className="flex items-center gap-x-2.5">
                    <img src="/icons/monitor-mobbile.svg" alt="" />
                    <span>Raise Issue</span>
                </div>
                {!employeeId && <AddIssueModal />}
            </div>

            {isLoading ? <CustomLoader className="min-h-20" /> : <div className="mt-6">
                <DataTable columns={columns} data={data} />
            </div>
            }

        </section>
    )
}
