import { AssetIssueStatus } from "./components/assest-issue-status"
import { AssetDetails } from "./components/asset-details"

export const AssetsPage = () => {
    return (
        <div className="flex flex-col gap-y-8 w-full">
            <AssetDetails />
            <AssetIssueStatus />
        </div>
    )
}
