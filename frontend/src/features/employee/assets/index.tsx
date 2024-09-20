import { AssetIssueStatus } from '@/features/assets/components/assest-issue-status'
import { AssetDetails } from '@/features/assets/components/asset-details'
import { useParams } from 'react-router-dom'

export const EmployeeAssetsPage = () => {
    const { employeeId } = useParams()

    console.log(employeeId);


    return (
        <div className="flex flex-col gap-y-8 w-full">
            <AssetDetails
                employeeId={employeeId}
            />
            <AssetIssueStatus />
        </div>
    )
}
