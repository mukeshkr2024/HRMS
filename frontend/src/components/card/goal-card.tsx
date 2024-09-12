import { Edit3Icon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { formatDate } from "@/utils";

interface GoalCardProps {
    title: string;
    progress: number;
    dueDate: Date;
    onEditClick: () => void
}

export const GoalCard: React.FC<GoalCardProps> = ({ title, progress, dueDate, onEditClick }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#191919] font-semibold text-lg">
                    {title}
                </CardTitle>
                <CardContent className="p-0 flex flex-col pt-8 gap-2">
                    <div className="flex items-end">
                        <span className="text-[#404040] font-bold text-5xl">{progress}%</span>
                        <span className="text-[#404040] text-sm pl-2">COMPLETE</span>
                        <Edit3Icon className="ml-auto cursor-pointer"
                            onClick={onEditClick}
                        />
                    </div>
                    <Progress value={progress} className="h-2" />
                </CardContent>
                <CardFooter className="p-0 pt-4">
                    <p className="text-sm font-semibold">Due: {formatDate(dueDate)}</p>
                </CardFooter>
            </CardHeader>
        </Card>
    );
};
