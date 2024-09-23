import { useState } from "react";
import { useGetGoals } from "@/features/goals/api/use-get-goals";
import { GoalCard } from "@/components/card/goal-card";
import { CreateGoalForm } from "@/components/form/create-goal-form";
import { UpdateGoal } from "@/components/form/update-goal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CirclePlus } from "lucide-react";
import { CustomLoader } from "@/components/shared/custom-loader";

interface Goal {
    _id: string;
    title: string;
    progress: number;
    dueDate: Date;
}

export const GoalList = ({ employeeId }: { employeeId?: string }) => {
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    const { data: goals = [], isLoading } = useGetGoals(employeeId, selectedStatus);

    const handleCreateClick = () => {
        setIsCreating(true);
        setIsEditing(null);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    return (
        <div>
            <div className="flex items-center gap-1.5">
                <img src="/icons/star.svg" alt="Star Icon" />
                <h2 className="font-semibold text-xl text-[#333333]">Goals</h2>
            </div>

            {isEditing ? (
                <UpdateGoal goalId={isEditing} setIsEditing={setIsEditing} employeeId={employeeId} />
            ) : isCreating ? (
                <CreateGoalForm setIsCreating={setIsCreating} employeeId={employeeId} />
            ) : (
                <>
                    <div className="mt-3 w-full flex justify-between">
                        <Button
                            className="h-8 font-normal flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#fbfafa] text-[#313131] shadow-sm"
                            onClick={handleCreateClick}
                        >
                            <CirclePlus size={18} /> New Goal
                        </Button>
                        <div className="mr-2 flex items-center gap-4">
                            <span className="text-[#313131] font-medium">Status</span>
                            <Select value={selectedStatus} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-[180px] h-9">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {isLoading ? (
                        <CustomLoader className="min-h-28" />
                    ) : goals.length > 0 ? (
                        <div className="mt-3 gap-4 grid lg:grid-cols-2 xl:grid-cols-3">
                            {goals.map((goal: Goal) => (
                                <GoalCard
                                    key={goal._id}
                                    title={goal.title}
                                    progress={goal.progress}
                                    dueDate={goal.dueDate}
                                    onEditClick={() => setIsEditing(goal._id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-20 text-muted-foreground">
                            No goals found
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
