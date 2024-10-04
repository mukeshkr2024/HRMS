import { Assessments } from "@/features/assessments"
import { useParams } from "react-router-dom";

export const TeamAssesmentPage = () => {
    const { memberId } = useParams();

    return (
        <div>
            <Assessments memberId={memberId} />
        </div>
    )
}
