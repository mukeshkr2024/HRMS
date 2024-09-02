import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ taskId, isDone }: { taskId: string, isDone: boolean }) => {
            const { data } = await apiClient.put(`/tasks/${taskId}`, { isDone });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            console.log("onError");
        }
    });
};
