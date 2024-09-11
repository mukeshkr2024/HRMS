import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export const useUpdateGoalProgress = (goalId: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (value: any) => {
            await apiClient.patch(`/employee/goals/${goalId}`, value)
        },
        onError: () => {
            toast({
                title: "Something went wrong , please try again"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] })
            toast({
                title: "Goal updated Successfully"
            })
        }
    })
}