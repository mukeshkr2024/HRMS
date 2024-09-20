import { GoalList } from "@/features/goals/components/goal-list";
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
