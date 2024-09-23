import { GoalFormSchemaType } from "@/components/form/create-goal-form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { getErrorMessage } from "@/utils";

export const useCreateGoal = (employee?: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: GoalFormSchemaType) => {
            const queryParams = new URLSearchParams();

            if (employee) {
                queryParams.append('employee', employee);
            }
            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
            await apiClient.post(`/employee/goals${queryString}`, values)
        },
        onError: (error) => {
            const message = getErrorMessage(error)

            toast({
                variant: "destructive",
                title: message,
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