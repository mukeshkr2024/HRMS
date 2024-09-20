import { apiClient } from "@/api/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async ({ taskId, isDone }: { taskId: string; isDone: boolean }) => {
            const { data } = await apiClient.put(`/tasks/${taskId}`, { isDone });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast({
                title: "Task updated successfully",
            });
        },
        onError: () => {
            toast({
                title: "Update failed",
                description: "There was an error updating the task. Please try again.",
            });
        },
    });
};
