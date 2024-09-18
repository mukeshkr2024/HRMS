"use client"

import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/utils";
import { Issue } from "./assest-issue-status";

export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: "name",
        header: "Category",
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
                    {/* @ts-ignore */}
                    {formatDate(row.original.createdAt)}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "approval",
        header: "Lead Approval",
    },
]