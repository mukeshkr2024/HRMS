"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Asset } from "./asset-details"
import { formatDate } from "@/utils";

export const columns: ColumnDef<Asset>[] = [
    {
        accessorKey: "name",
        header: "Category",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "serialNo",
        header: "Serial no.",
    },
    {
        accessorKey: "assignedAt",
        header: "Date assigned",
        cell: ({ row }) => {
            return (
                <div>
                    {formatDate(row.original.assignedAt)}
                </div>
            )
        }
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const status: string = row.getValue("status");
    //         const color = statusColor(status)
    //         return (
    //             <div className="flex items-center">
    //                 <span
    //                     style={{
    //                         backgroundColor: color,
    //                     }}
    //                     className="inline-block size-[10px] rounded-full mr-[8px]"
    //                 ></span>
    //                 <p style={{ margin: 0 }}>{status}</p>
    //             </div>
    //         );
    //     }
    // },
    // {
    //     accessorKey: "actions",
    //     header: "Tickets",
    //     cell: () => (
    //         <div>
    //             Tickets
    //         </div>
    //     ),
    // }
]