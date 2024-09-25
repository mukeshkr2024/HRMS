import { columns as baseColumns } from "./columns"
import { DataTable } from "./data-table"
import { AddAssetModel } from "./add-asset-modal"
import { useGetAssets } from "@/features/assets/api/use-get-assets"
import { useAuthStore } from "@/context/useAuthStore"
import { CustomLoader } from "@/components/shared/custom-loader"

export type Asset = {
    _id: string
    name: string
    description: string
    serialNo: string
    assignedAt: string
    status: "pending" | "processing" | "success" | "failed"
}

export const AssetDetails = ({ employeeId }: { employeeId?: string }) => {
    const { data, isLoading } = useGetAssets(employeeId)
    const { employee } = useAuthStore()

    const columns = employee?.role === "admin"
        ? baseColumns
        : baseColumns.filter(col => col.id !== "actions")

    return (
        <section>
            <div className="flex items-center gap-x-10">
                <div className="flex items-center gap-x-2.5">
                    <img src="/icons/monitor-mobbile.svg" alt="" />
                    <span>Assets</span>
                </div>
                {employee?.role === "admin" && <AddAssetModel
                    employeeId={employeeId}
                />}
            </div>
            {isLoading ? <CustomLoader className="min-h-20" /> : <div className="mt-6">
                <DataTable columns={columns} data={data} />
            </div>}
        </section>
    )
}