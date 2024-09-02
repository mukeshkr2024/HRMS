import { formatDate, statusColor } from "@/utils"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { cn } from "@/utils/cn"

type Props = {
    category: string
    raisedAt: Date
    serial: string
    description: string
    status: string
    assignedAt: Date,
    raisedDescriptions?: string
    ticketStatus: string
    approvedByLead: boolean
}



export const AssetIssueCard = ({ category, raisedAt, serial, description, status, assignedAt, raisedDescriptions, ticketStatus, approvedByLead }: Props) => {
    return (
        <Card className="shadow-md flex-1 p-5 font-urbanist flex gap-y-2.5 flex-col">
            <div className="grid grid-cols-2 gap-2">
                <p className="font-semibold text-[#333333] flex items-center gap-x-6">Category: <span className="text-sm text-[#878787] font-medium font-urbanist">{category}</span></p>
                <p className="font-semibold text-[#333333] flex items-center gap-x-6">Date: <span className="text-sm text-[#878787] font-medium font-urbanist">{formatDate(raisedAt)}</span></p>
                <p className="font-semibold text-[#333333] flex items-center gap-x-6">Description: <span className="text-sm text-[#878787] font-medium font-urbanist">{description}</span></p>
                <p className="font-semibold text-[#333333] flex items-center gap-x-6">Status: <span className="text-sm text-[#878787] font-medium font-urbanist flex items-center gap-2" ><div className="size-2 rounded-full" style={{
                    backgroundColor: statusColor(status)
                }}>
                </div>{status}</span></p>
                <p className="font-semibold text-[#333333] flex items-center gap-x-6">Serial No.: <span className="text-sm text-[#878787] font-medium font-urbanist">{serial}</span></p>
                <p className="font-semibold text-[#333333] flex items-center gap-x-6">Date assigned: <span className="text-sm text-[#878787] font-medium font-urbanist">{formatDate(assignedAt)}</span></p>
            </div>
            <div className="flex flex-col gap-y-2">
                <p className="font-semibold text-[#333333] flex items-center gap-x-6">Issue Raised Description</p>
                <Textarea value={raisedDescriptions} readOnly={true} className="text-sm text-[#878787] font-medium font-urbanist" />
            </div>
            <div className="flex gap-6 mt-2">
                <div className="flex-1 flex gap-y-2 flex-col">
                    <p className="text-[#333333] font-semibold">Ticket Status</p>
                    <Input value={ticketStatus} className="h-9 text-[#878787]" readOnly />
                </div>
                <div className="w-40 flex gap-y-2 flex-col">
                    <p className="text-[#333333] font-semibold">Lead Approval</p>
                    <div className="flex items-center gap-x-2">
                        <div className={cn("size-2 rounded-full", approvedByLead ? "bg-[#85E16E]" : "bg-[#FF5757]")}></div>
                        <p className="text-sm text-[#878787] font-medium">{approvedByLead ? "Approved" : "Not Approved"}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
