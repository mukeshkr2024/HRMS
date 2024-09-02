import { AssetIssueStatus } from "@/components/assets/assest-issue-status"
import { AssetDetails } from "@/components/assets/asset-details"

export const AssetsPage = () => {
    return (
        <div className="flex flex-col gap-y-8 w-full">
            <AssetDetails />
            <AssetIssueStatus />
        </div>
    )
}
