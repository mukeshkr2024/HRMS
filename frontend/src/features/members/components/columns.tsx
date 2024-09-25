
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatDate, statusColor } from "@/utils";
import { useState } from "react";
import { Issue } from "@/features/assets/components/assest-issue-status";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateMemberIssue } from "../api/use-update-member-issue";
import { useAuthStore } from "@/context/useAuthStore";

export const memberColumnData: ColumnDef<Issue>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Serial no
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <>
            <h3 className="font-medium">{row.index + 1}</h3>
        </>
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <p>{row.original?.title}</p>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Description
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <p className="max-w-[20rem] break-words">{row.original?.description}</p>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Raised At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <p>{formatDate(row.original?.createdAt)}</p>,
    },
    {
        accessorKey: "approval",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Lead Approval
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const { employee } = useAuthStore()
            const [selected, setSelected] = useState<string>(row.original?.approval)

            console.log(employee);

            const mutation = useUpdateMemberIssue(row.original._id)

            const onChange = (value: string) => {
                setSelected(value)
                mutation.mutate({ value })
            }

            const color = statusColor(row.original.approval);

            return (
                <>
                    {employee?.role !== "admin" ? <Select value={selected} onValueChange={onChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select> : (
                        <div className="flex items-center gap-2 capitalize">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            {row.original.approval}
                        </div>
                    )}
                </>

            )
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const { employee } = useAuthStore()
            const [selected, setSelected] = useState<string>(row.original?.approval)

            console.log(employee);

            const mutation = useUpdateMemberIssue(row.original._id)

            const onChange = (value: string) => {
                setSelected(value)
                mutation.mutate({ value })
            }

            const color = statusColor(row.original.approval);

            return (
                <>
                    {employee?.role == "admin" ? <Select value={selected} onValueChange={onChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select> : (
                        <div className="flex items-center gap-2 capitalize">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            {row.original.approval}
                        </div>
                    )}
                </>

            )
        }
    },
];
