import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { useToast } from "@/components/ui/use-toast"

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
                console.log("Error deleting task", error)
            }
        }
    )
}