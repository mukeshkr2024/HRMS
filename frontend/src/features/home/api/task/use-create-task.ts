import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/api-client";

type TaskData = {
    title: string;
};

export const useCreateTask = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taskData: TaskData) => {
            await apiClient.post("/tasks", taskData);
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to create task. Please try again.",
                variant: "destructive",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });
            toast({
                title: "Task created successfully",
            });
        },
    });
};
