import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";

export const useDeleteAsset = (employee?: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const queryParams = new URLSearchParams();
            if (employee) {
                queryParams.append('employee', employee);
            }
            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
            await apiClient.delete(`/assets/${id}${queryString}`,)
        },
        onError: (error) => {
            const message = getErrorMessage(error)
            toast({
                variant: "destructive",
                title: message
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assets"] })
            toast({
                title: "Assets deleted successfully"
            })
        }
    })
}