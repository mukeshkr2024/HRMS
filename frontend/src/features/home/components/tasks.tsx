import { Trash } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddNewTaskPopup } from "./add-task";
import { useGetTasks } from "../api/task/use-get-tasks";
import { useDeleteTask } from "../api/task/use-delete-task";
import { useUpdateTask } from "../api/task/use-update-task";
import { Skeleton } from "@/components/ui/skeleton";

const CheckedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Checked">
        <circle cx="7" cy="7" r="5" stroke="url(#paint0_linear)" strokeWidth="4" />
        <defs>
            <linearGradient id="paint0_linear" x1="-3.5" y1="17.5" x2="12" y2="9" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1FBE8E" />
                <stop offset="1" stopColor="#01855D" />
            </linearGradient>
        </defs>
    </svg>
);

const UnCheckedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Unchecked">
        <circle cx="7" cy="7" r="6.5" fill="#F5F5F5" stroke="#E1E1E1" />
    </svg>
);

export const Tasks = () => {
    const { data, isFetched, isLoading } = useGetTasks();

    return (
        <Card className="bg-[#F7F8FA] p-4">
            <div className="flex justify-between items-center">
                <h4>All Tasks</h4>
                <AddNewTaskPopup>
                    <Button className="h-8 font-normal bg-[#FFFFFF] hover:bg-[#fbfafa] text-[#313131] shadow-sm">Create Task</Button>
                </AddNewTaskPopup>
            </div>
            <div className="mt-5 flex flex-col gap-y-2 custom-scrollbar" style={{ height: "350px", overflowY: "auto" }}>
                {
                    isLoading && (
                        <>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Skeleton className="w-full h-10" key={index} />
                                ))
                            }
                        </>
                    )
                }
                {isFetched ? (
                    data?.tasks?.length ? (
                        data.tasks.map((task: any) => (
                            <TaskCard key={task._id} {...task} />
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground text-sm">No tasks yet</p>
                    )
                ) : null}
            </div>
        </Card>
    );
};

const TaskCard = ({ _id, isDone, title }: { _id: string; isDone: boolean; title: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const updateTaskMutation = useUpdateTask();
    const deleteTaskMutation = useDeleteTask();

    const handleUpdateTaskStatus = () => {
        updateTaskMutation.mutate({ taskId: _id, isDone: !isDone });
    };

    const handleDelete = () => {
        deleteTaskMutation.mutate(_id);
    };

    return (
        <Card
            className="flex p-3 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div onClick={handleUpdateTaskStatus} className="cursor-pointer">
                {isDone ? <CheckedIcon /> : <UnCheckedIcon />}
            </div>
            <span className="pl-4 text-sm text-[#616161] break-words max-w-[90%]">{title}</span>
            <Trash
                onClick={handleDelete}
                className={`absolute right-2 top-2 size-4 cursor-pointer text-red-400 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
        </Card>
    );
};
