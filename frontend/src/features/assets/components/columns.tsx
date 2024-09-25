import { ColumnDef } from "@tanstack/react-table"
import { Asset } from "./asset-details"
import { formatDate } from "@/utils";
import { useAuthStore } from "@/context/useAuthStore";
import { Edit, Trash } from "lucide-react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { AddAssetModel } from "./add-asset-modal";
import { useDeleteAsset } from "../api/use-delete-assets";
import { useParams } from "react-router-dom";

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
                    {/* @ts-ignore */}
                    {formatDate(row.original.assignedAt)}
                </div>
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { employee } = useAuthStore();
            const { employeeId } = useParams()

            const mutation = useDeleteAsset(employeeId);

            const handleDelete = () => {
                mutation.mutate(row.original._id);
            }

            if (employee?.role === "admin") {
                return (
                    <div className="flex gap-x-2">
                        <AddAssetModel
                            existingAsset={row.original}
                        >
                            <Edit
                                size={18}
                                className="cursor-pointer"
                            />
                        </AddAssetModel>
                        <ConfirmDialog onConfirm={() => handleDelete()}>
                            <Trash
                                size={18}
                                className="cursor-pointer text-red-500"
                            />
                        </ConfirmDialog>
                    </div>
                );
            }
            return null;
        }
    }
]