import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AddAssetModel } from "./add-asset-modal"
import { useGetAssets } from "@/api/assets/use-get-assets"
import { Loader } from "lucide-react"
import { useAuthStore } from "@/context/useAuthStore"

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
    console.log(data);


    if (isLoading) {
        return <div
            className="flex h-full w-full items-center justify-center"
        >
            <Loader className="animate-spin text-muted-foreground" />
        </div>
    }

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

            <div className="mt-6">
                <DataTable columns={columns} data={data} />
            </div>

        </section>
    )
}