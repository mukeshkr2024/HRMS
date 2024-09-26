
import { useDeleteProfile } from "@/features/profiles/api/use-delete-profile";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Department } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { AddNewProfile } from "./add-new-profile";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const profileColumnData: ColumnDef<Department>[] = [
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
        cell: ({ row }) => <div>
            <h3 className="font-medium  max-w-xl">{row.original.name}</h3>
            <HoverCard>
                <HoverCardTrigger>
                    <p className="text-muted-foreground line-clamp-2 break-words cursor-pointer">{row.original.description}</p>
                </HoverCardTrigger>
                <HoverCardContent className="w-[40rem] h-auto break-words">
                    {
                        row.original.description
                    }
                </HoverCardContent>
            </HoverCard>
        </div>
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
            const deleteMutation = useDeleteProfile()

            const onDelete = (profileId: string) => {
                if (!profileId) return;
                deleteMutation.mutate(profileId)
            }

            return (<div className="flex gap-x-2 w-full items-center ">
                <AddNewProfile existingProfile={row.original}>
                    <Edit size={18} />
                </AddNewProfile>
                <ConfirmDialog
                    onConfirm={() => onDelete(row.original._id)}
                >
                    <Trash size={18} className="text-red-500 cursor-pointer hover:text-red-700" />
                </ConfirmDialog>
            </div>)
        }
    },
];
