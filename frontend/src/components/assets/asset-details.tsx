import { columns } from "./columns"
import { DataTable } from "./data-table"

export type Asset = {
    id: string
    category: string
    description: string
    serial: string
    assignedAt: string
    status: "pending" | "processing" | "success" | "failed"
}
const assets: Asset[] = [
    {
        id: "A001",
        category: "Laptop",
        description: "Dell XPS 13 with 16GB RAM and 512GB SSD",
        serial: "DLX13-2023-001",
        assignedAt: "2024-07-10T09:00:00Z",
        status: "success"
    },
    {
        id: "A002",
        category: "Monitor",
        description: "Samsung 27-inch 4K Ultra HD Monitor",
        serial: "SM27-2023-002",
        assignedAt: "2024-07-12T14:30:00Z",
        status: "pending"
    },
    {
        id: "A003",
        category: "Printer",
        description: "HP LaserJet Pro MFP M428fdw",
        serial: "HP428-2023-003",
        assignedAt: "2024-07-15T11:15:00Z",
        status: "processing"
    },
    {
        id: "A004",
        category: "Smartphone",
        description: "Apple iPhone 14 Pro Max - 256GB",
        serial: "IP14-2023-004",
        assignedAt: "2024-07-18T16:45:00Z",
        status: "failed"
    },
    {
        id: "A005",
        category: "Headphones",
        description: "Sony WH-1000XM5 Noise Cancelling Headphones",
        serial: "SNXM5-2023-005",
        assignedAt: "2024-07-20T10:00:00Z",
        status: "success"
    }
];


export const AssetDetails = () => {
    return (
        <section>
            <div className="flex items-center gap-x-10">
                <div className="flex items-center gap-x-2.5">
                    <img src="/icons/monitor-mobbile.svg" alt="" />
                    <span>Assets</span>
                </div>
            </div>

            <div className="mt-6">
                <DataTable columns={columns} data={assets} />
            </div>

        </section>
    )
}
