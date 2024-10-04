import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/context/useAuthStore";
import { useEffect, useState } from "react";
import { useGetAssessment } from "./api/use-get-assement";
import { useGetAssessments } from "./api/use-get-assement-list";
import { useUpdateAssessment } from "./api/use-update-assement";
import { Assessment } from "./components/assessment";


export const Assessments = ({
    memberId
}: {
    memberId?: string
}) => {

    const { data: assessments, isLoading: isAssessmentsLoading } = useGetAssessments(memberId);
    const [selectedAssessment, setSelectedAssessment] = useState("");
    const { employee } = useAuthStore();
    const userRole = employee?.role;

    const { data: assessment, isLoading } = useGetAssessment(selectedAssessment);
    const mutation = useUpdateAssessment(memberId);

    useEffect(() => {
        if (assessments?.length) {
            setSelectedAssessment(assessments[0]._id);
        }
    }, [assessments]);

    const handleSubmit = (formData: any, type: string) => {
        const assessmentId = type === "self"
            ? assessment?.selfAssessment?._id
            : assessment?.managerAssessment?._id;

        if (assessmentId) {
            mutation.mutate({ data: formData, id: assessmentId });
        }
    };

    const getAssessments = () => {

        if (isLoading) {
            return (
                <>
                    <FallbackUi />
                    <FallbackUi />
                </>
            )
        }

        if (!assessments?.length) {
            return (
                <div className="w-full text-center">
                    <h3 className="text-lg text-gray-600">No assessments available</h3>
                </div>
            );
        }

        if (userRole === "admin") { // TODO: later change to employee role
            return (
                <>
                    <Assessment
                        type="self"
                        data={assessment}
                        onSubmit={(data) => handleSubmit(data, "self")}
                        isVisible={true}
                        hideField={false}
                    />
                    <Assessment
                        type="manager"
                        data={assessment}
                        onSubmit={(data) => handleSubmit(data, "manager")}
                        isVisible={assessment?.selfAssessment?.isCompleted}
                        hideField={true}
                        name={assessment?.employee?.name}
                    />
                </>
            )
        } else if (userRole === "manager") {
            return (
                <>
                    <Assessment
                        type="manager"
                        data={assessment}
                        onSubmit={(data) => handleSubmit(data, "manager")}
                        isVisible={true}
                        hideField={false}
                        name={assessment?.employee?.name}
                    />
                    <Assessment
                        type="self"
                        data={assessment}
                        onSubmit={(data) => handleSubmit(data, "self")}
                        isVisible={assessment?.managerAssessment?.isCompleted}
                        hideField={true}
                    />
                </>
            )
        } else {
            return (
                <>
                    <Assessment
                        type="manager"
                        data={assessment}
                        onSubmit={(data) => handleSubmit(data, "manager")}
                        isVisible={true}
                        hideField={true}
                        name="Mukesh kumar"
                    />
                    <Assessment
                        type="self"
                        data={assessment}
                        onSubmit={(data) => handleSubmit(data, "self")}
                        isVisible={true}
                        hideField={true}
                    />
                </>
            )
        }


    }

    return (

        <div className="w-full h-full">
            <div className="flex items-center gap-4 py-2">
                <h2 className="font-semibold text-xl text-[#333333]">Assessments</h2>
                {isAssessmentsLoading ? <Skeleton className="h-9 w-full max-w-xs" /> : <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                    <SelectTrigger className="w-full max-w-xs h-9">
                        <SelectValue placeholder="Select Assessment" />
                    </SelectTrigger>
                    <SelectContent>
                        {assessments?.map((item: any) => (
                            <SelectItem key={item._id} value={item._id} className="h-9">
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>}
            </div>
            <Separator />
            <div className="flex w-full gap-6 mt-4">
                {getAssessments()}
            </div>
        </div>

    )
}


const FallbackUi = () => {
    return (
        <Card className="flex-grow p-6 border">
            <CardHeader>
                <CardTitle>
                    <Skeleton
                        className="w-full h-10"
                    />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {
                        Array(4).fill(null).map((_, index) => (
                            <div className="gap-y-2" key={index}>
                                <Skeleton
                                    className="w-full h-2"
                                />
                                <Skeleton
                                    className="w-full h-6"
                                />
                            </div>))
                    }
                </div>
            </CardContent>
        </Card>
    )
}