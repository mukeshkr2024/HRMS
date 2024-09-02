import { AssetIssueCard } from "../card/asset-issue-card"


const issues = [
    {
        id: "A001",
        category: "Laptop",
        description: "Dell XPS 13",
        serial: "DLX13-2023-001",
        assignedAt: "2024-07-10T09:00:00Z",
        status: "success",
        raisedDescriptions: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        ticketStatus: "Under Review",
        approvedByLead: false,
        raisedAt: "2026-07-10T09:00:00"
    },
    {
        id: "A002",
        category: "Laptop",
        description: "Dell XPS 13 ",
        serial: "DLX13-2023-001",
        assignedAt: "2024-07-10T09:00:00Z",
        status: "success",
        raisedDescriptions: "Lorem ipsum dolor, sit amet consectetur adipisicing elit!",
        ticketStatus: "Under Review",
        approvedByLead: true,
        raisedAt: "2026-07-10T09:00:00"
    },

]


export const AssetIssueStatus = () => {
    return (
        <section className="w-full">
            <div className="flex items-center gap-x-10">
                <div className="flex items-center gap-x-2.5">
                    <img src="/icons/monitor-mobbile.svg" alt="" />
                    <span>Issue Status</span>
                </div>
            </div>

            <div className="flex w-full gap-x-8 mt-6">
                {
                    issues.map((issue) => (
                        // @ts-ignore
                        <AssetIssueCard key={issue.id}  {...issue} />
                    ))
                }
            </div>
        </section>
    )
}
