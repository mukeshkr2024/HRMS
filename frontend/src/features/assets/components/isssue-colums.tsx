import { ColumnDef } from "@tanstack/react-table";
import { formatDate, statusColor } from "@/utils";
import { Issue } from "./assest-issue-status";

export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "createdAt",
        header: "Raised At",
        cell: ({ row }) => {
            return (
                <div>
                    {formatDate(row.original.createdAt)}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const color = statusColor(row.original.status);

            return (
                <div className="flex items-center gap-2 capitalize">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    {row.original.status}
                </div>
            )
        },
    },
    {
        accessorKey: "approval",
        header: "Lead Approval",
        cell: ({ row }) => {
            const color = statusColor(row.original.status);

            return (
                <div className="flex items-center gap-2 capitalize">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    {row.original.status}
                </div>
            )
        },
    },
];
