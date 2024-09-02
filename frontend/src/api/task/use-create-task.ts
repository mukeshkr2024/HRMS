import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client";
import { useToast } from "@/components/ui/use-toast";

type TaskData = {
    title: string;
}

export const useCreateTask = () => {

    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taskData: TaskData) => {
            await apiClient.post("/tasks", taskData)
        },
        onError: (error) => {
            console.log("Error", error);

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            toast({
                title: "Task created successfully"
            })
        }
    })
}