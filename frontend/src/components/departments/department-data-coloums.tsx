
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Department } from "@/types";
import { ConfirmDialog } from "../confirm-dialog";
import { useDeleteDepartment } from "@/api/departments/use-delete-department";

export const DepartmentColumnData: ColumnDef<Department>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Department
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <>
            <h3 className="font-medium">{row.original.name}</h3>
            <p className="text-muted-foreground line-clamp-2">{row.original.description}</p>
        </>
    },
    {
        accessorKey: "employees",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Employees
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <p>{row.original.employees}</p>,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>,
    },
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Actions
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({
            row
        }) => {
            const deleteMutation = useDeleteDepartment()

            const onDelete = (departmentId: string) => {
                if (!departmentId) return;
                deleteMutation.mutate(departmentId)
            }

            return (<div className="flex gap-x-5 w-full items-center justify-center">
                <ConfirmDialog
                    onConfirm={() => onDelete(row.original._id)}
                >
                    <Trash size={18} className="text-red-500 cursor-pointer hover:text-red-700" />
                </ConfirmDialog>
            </div>)
        }
    },
];
