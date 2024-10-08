import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDepartment = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (departmentId: string) => {
            await apiClient.delete(`/departments/${departmentId}`)
        },
        onError: (error) => {
            const message = getErrorMessage(error)
            toast({
                variant: "destructive",
                title: message,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            toast({
                title: "Department deleted successfully"
            })
        }
    })
}  