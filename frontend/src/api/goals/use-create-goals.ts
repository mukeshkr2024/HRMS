import { GoalFormSchemaType } from "@/components/form/create-goal-form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export const useCreateGoal = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: GoalFormSchemaType) => {
            await apiClient.post("/employee/goals", values)
        },
        onError: () => {
            toast({
                title: "Something went wrong , please try again"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] })
            toast({
                title: "Goal created Successfully"
            })
        }
    })
}