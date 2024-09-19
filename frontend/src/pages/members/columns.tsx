import { UserAvatar } from "@/components/shared/user-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Employee = {
    serialNumber: string;
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
    _id: string
};

export const memberColumns: ColumnDef<Employee>[] = [
    {
        accessorKey: "serialNumber",
        header: "",
        // header: ({ column }) => (
        //     <Button
        //         variant="ghost"
        //         onClick={() =>
        //             column.toggleSorting(column.getIsSorted() === "asc")
        //         }
        //     >
        //         Employee ID
        //         <ArrowUpDown className="ml-2 h-4 w-4" />
        //     </Button>
        // ),
        cell: ({ row }) => <div>{row.original.serialNumber}</div>,
    },
    {
        accessorKey: "assesment",
        header: '',
        cell: ({ row }) => (
            <Link to={`/employees/${row.original._id}`}>
                <div className="flex gap-5 items-center font-urbanist">

                    <UserAvatar
                        avatar={row.original?.avatar}
                        name={row.original.firstName}
                    />
                    <div className="flex flex-col text-start">
                        <h3 className="text-[#297EE2] font-bold text-lg">
                            {row.original.firstName} {row.original.lastName}
                        </h3>
                        <p className="text-[#3F3F3F] font-medium font-urbanist">
                            {row.original.designation}
                        </p>
                    </div>
                </div>
            </Link>

        ),
    },
    {
        accessorKey: "id",
        header: '',
        cell: ({ row }) => (
            <div className="flex flex-col text-start text-[#3F3F3F] font-medium font-urbanist">
                <p>{row.original.email}</p>
            </div>
        ),
    },
];
