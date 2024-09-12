import { useGetTasks } from "@/api/task/use-get-tasks";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { AddNewTaskPopup } from "./add-task";
import { useUpdateTask } from "@/api/task/use-update-task";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useDeleteTask } from "@/api/task/use-delete-task";

const CheckedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Checked">
        <circle cx="7" cy="7" r="5" stroke="url(#paint0_linear_49_13480)" strokeWidth="4" />
        <defs>
            <linearGradient id="paint0_linear_49_13480" x1="-3.5" y1="17.5" x2="12" y2="9" gradientUnits="userSpaceOnUse">
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
    const { data, isFetched } = useGetTasks();


    return (
        <Card className="bg-[#F7F8FA] p-4">
            <div className="flex justify-between items-center">
                <h4>All Tasks</h4>
                <AddNewTaskPopup>
                    <Button className="h-8 font-normal bg-[#FFFFFF] hover:bg-[#fbfafa] text-[#313131] shadow-sm">Create Task</Button>
                </AddNewTaskPopup>
            </div>
            <div className="mt-5 flex flex-col gap-y-2" style={{
                height: "350px",
                overflowY: "auto"
            }}>
                {isFetched && data?.tasks?.length > 0 ? data.tasks.map((task: any) => (
                    <TaskCard
                        _id={task?._id}
                        isDone={task?.isDone}
                        title={task?.title}
                    />
                )) : (
                    <div>
                        <p className="text-center text-muted-foreground text-sm">No task yet</p>
                    </div>
                )}
            </div>
        </Card>
    );
};


const TaskCard = ({ _id, isDone, title }: {
    _id: string,
    isDone: boolean,
    title: string
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const updateTaskMutation = useUpdateTask();
    const deleteTaskMutation = useDeleteTask();
    const handleUpdateTaskStatus = (taskId: string, isDone: boolean) => {
        if (!taskId) return;
        updateTaskMutation.mutate({ taskId, isDone });
    };

    const handleDelete = (id: string) => {
        if (!id) return;
        deleteTaskMutation.mutate(id)
    }
    return (
        <Card
            key={_id}
            className="flex p-3 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isDone ? (
                <div onClick={() => handleUpdateTaskStatus(_id, false)} className="cursor-pointer"><CheckedIcon /></div>
            ) : (
                <div onClick={() => handleUpdateTaskStatus(_id, true)} className="cursor-pointer"><UnCheckedIcon /></div>
            )}
            <span className="pl-4 text-sm text-[#616161]">
                {title}
            </span>
            <Trash
                onClick={() => handleDelete(_id)}
                className={`absolute right-2 bottom-2 size-4 cursor-pointer text-red-400 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            />
        </Card>
    )
}