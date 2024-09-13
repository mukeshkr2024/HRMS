import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../shared/user-avatar";

export type Employee = {
    employeeId: string;
    firstName: string;
    lastName: string;
    positionName: string;
    createdAt: string;
    profile: string;
    designation: string;
    location: string;
    type: string;
    joiningDate: string;
    dob: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    alternativeNumber: string;
    assesment: {
        id: string;
    }[];
    avatar: string
};

export const EmployeeColumnData: ColumnDef<Employee>[] = [
    {
        accessorKey: "employeeId",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Employee ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.employeeId}</div>,
    },
    {
        accessorKey: "assesment",
        header: '',
        cell: ({ row }) => (
            <div className="flex gap-5 items-center font-urbanist">
                {/* <img
                    src={row.original.profile}
                    alt={`${row.original.firstName} ${row.original.lastName}`}
                    className="w-10 h-10 rounded-full"
                /> */}
                <UserAvatar
                    avatar={row.original?.avatar}
                    name={row.original.firstName}
                />
                {/* <p>{JSON.stringify(row.original)}</p> */}
                <div className="flex flex-col text-start">
                    <h3 className="text-[#297EE2] font-bold text-lg">
                        {row.original.firstName} {row.original.lastName}
                    </h3>
                    <p className="text-[#3F3F3F] font-medium font-urbanist">
                        {row.original.designation}
                    </p>
                    <p>{row.original.location}</p>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: '',  // Empty header
        cell: ({ row }) => (
            <div className="flex flex-col text-start text-[#3F3F3F] font-medium font-urbanist">
                <p>{row.original.type}</p>
                <p>DOJ: {row.original.joiningDate}</p>
                <p>DOB: {row.original.dob}</p>
            </div>
        ),
    },
    {
        accessorKey: "id",
        header: '',  // Empty header
        cell: ({ row }) => (
            <div className="flex flex-col text-start text-[#3F3F3F] font-medium font-urbanist">
                <p>{row.original.email}</p>
                <p>{row.original.phone}</p>
                <p>{row.original.alternativeNumber}</p>
            </div>
        ),
    },
    {
        accessorKey: "linkedinUrl",
        header: '',  // Empty header
        cell: ({ row }) => (
            <Link
                to={row.original.linkedinUrl}
                className="flex justify-end items-center"
                target="_blank"
            >
                <img src="/icons/linkedIn.svg" alt="LinkedIn" />
            </Link>
        ),
    },
];
