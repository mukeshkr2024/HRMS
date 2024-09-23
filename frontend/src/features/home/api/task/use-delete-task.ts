import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { apiClient } from "@/api-client"
import { getErrorMessage } from "@/utils"

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    return useMutation(
        {
            mutationFn: async (taskId: string) => {
                await apiClient.delete(`/tasks/${taskId}`);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["tasks"] })
                toast({
                    title: "Task deleted successfully"
                })
            },
            onError: (error) => {
                const message = getErrorMessage(error)
                toast({
                    title: "Error",
                    description: message,
                    variant: "destructive",
                });
            },
        }
    )
}