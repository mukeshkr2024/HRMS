import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AddAssetModel } from "./add-asset-modal"
import { useGetAssets } from "@/api/assets/use-get-assets"
import { useAuthStore } from "@/context/useAuthStore"
import { CustomLoader } from "../shared/custom-loader"

export type Asset = {
    id: string
    category: string
    description: string
    serial: string
    assignedAt: Date
    status: "pending" | "processing" | "success" | "failed"
}

export const AssetDetails = ({ employeeId }: { employeeId?: string }) => {
    const { data, isLoading } = useGetAssets(employeeId)
    const { employee } = useAuthStore()
    return (
        <section>
            <div className="flex items-center gap-x-10">
                <div className="flex items-center gap-x-2.5">
                    <img src="/icons/monitor-mobbile.svg" alt="" />
                    <span>Assets</span>
                </div>
                {employee?.role === "admin" && <AddAssetModel
                />}
            </div>
            {isLoading ? <CustomLoader className="min-h-20" /> : <div className="mt-6">
                <DataTable columns={columns} data={data} />
            </div>}
        </section>
    )
}