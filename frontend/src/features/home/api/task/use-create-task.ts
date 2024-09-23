import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/api-client";
import { getErrorMessage } from "@/utils";

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
        onError: (error) => {
            const message = getErrorMessage(error)

            toast({
                title: "Error",
                description: message,
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
