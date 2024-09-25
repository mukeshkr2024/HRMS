import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Member = {
    _id: string;
    name: string;
    avatar: string;
    email: string;
};

export const memberColumns: ColumnDef<Member>[] = [
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Serial No
            </Button>
        ),
        cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
        accessorKey: "assesment",
        header: ({ column }) => (
            <div className="flex">
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Member
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <Link to={`/members/${row.original._id}`}>
                <div className="flex gap-5 items-center  font-urbanist">

                    <UserAvatar
                        avatar={row.original?.avatar}
                        name={row.original?.name}
                    />
                    <div className="flex flex-col text-start">
                        <h3 className="text-[#297EE2] font-bold text-lg">
                            {row.original?.name}
                        </h3>
                    </div>
                </div>
            </Link>

        ),
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <div className="flex">
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                </Button>
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex flex-col text-start text-[#3F3F3F] font-medium font-urbanist">
                <p>{row.original.email}</p>
            </div>
        ),
    },
];