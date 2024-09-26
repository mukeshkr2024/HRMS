import { ColumnDef } from "@tanstack/react-table";
import { formatDate, statusColor } from "@/utils";
import { Issue } from "./assest-issue-status";
import { Edit, Trash } from "lucide-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { AddIssueModal } from "./add-issue-model";
import { useDeleteIssue } from "../api/issues/use-delete-assets";
import { useParams } from "react-router-dom";

export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <p className="max-w-xl break-words line-clamp-3">{row.original.description}</p>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Raised At",
        cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const color = statusColor(row.original.status);
            return (
                <div className="flex items-center gap-2 capitalize">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    {row.original.status}
                </div>
            );
        },
    },
    {
        accessorKey: "approval",
        header: "Lead Approval",
        cell: ({ row }) => {
            const color = statusColor(row.original.approval);
            return (
                <div className="flex items-center gap-2 capitalize">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    {row.original.approval}
                </div>
            );
        },
    },
    {
        accessorKey: "options",
        header: "Options",
        cell: ({ row }) => {

            const deleteMutation = useDeleteIssue(row.original._id)
            const { employeeId } = useParams();


            const handleDeleteConfirm = () => {
                deleteMutation.mutate()
            };

            return (
                <div className="flex items-center gap-2 capitalize">
                    {!employeeId && <AddIssueModal
                        existingIssue={row.original}
                    >
                        <Edit className="cursor-pointer" size={18} />
                    </AddIssueModal>}
                    <ConfirmDialog onConfirm={handleDeleteConfirm}>
                        <Trash className="text-red-500 cursor-pointer" size={18} />
                    </ConfirmDialog>
                </div>
            );
        },
    },
];
