import { apiClient } from "@/api-client";
import { AddAssetFormSchemaType } from "@/features/assets/components/add-asset-modal";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";

export const useAddAsset = (employee?: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddAssetFormSchemaType) => {
            const queryParams = new URLSearchParams();
            if (employee) {
                queryParams.append('employee', employee);
            }

            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
            await apiClient.post(`/assets/add${queryString}`, data)
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
                title: "Assets added  successfully"
            })
        }
    })
}