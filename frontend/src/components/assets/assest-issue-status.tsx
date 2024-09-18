import { AddIssueModal } from "./add-issue-model"
import { DataTable } from "./data-table"
import { columns } from "./isssue-colums"

export type Issue = {
    _id: string
    title: string
    description: string
    status: "pending" | "processing" | "success" | "failed",
    approval: "pending" | "processing" | "success" | "failed",
    createdAt: string
}

export const AssetIssueStatus = () => {

    const data: Issue[] = [
        {
            "_id": "66eaa26a9126bade0526345b",
            "description": "Assest description 1",
            "createdAt": "2024-09-18T09:50:34.496Z",
            "status": "pending",
            "approval": "pending",
            "title": "Assest description"
        },
        {
            "_id": "66eaa26a9126bade0526345b",
            "description": "Assest description 1",
            "createdAt": "2024-09-18T09:50:34.496Z",
            "status": "pending",
            "approval": "pending",
            "title": "Assest description"
        },
    ]

    return (
        <section className="w-full">
            <div className="flex items-center gap-x-10">
                <div className="flex items-center gap-x-2.5">
                    <img src="/icons/monitor-mobbile.svg" alt="" />
                    <span>Raise Issue</span>
                </div>
                <AddIssueModal />
            </div>

            <div className="mt-6">
                <DataTable columns={columns} data={data} />
            </div>


        </section>
    )
}
