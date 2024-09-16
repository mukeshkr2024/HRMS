import { GoalList } from "@/components/goals/goal-list"
import { useParams } from "react-router-dom"

export const EmployeeGoalsPage = () => {
    const { employeeId } = useParams();
    return (
        <div>
            <GoalList
                employeeId={employeeId}
            />
        </div>
    )
}
