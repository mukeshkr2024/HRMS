import { apiClient } from "@/api-client";
import { AddAssetFormSchemaType } from "@/features/assets/components/add-asset-modal";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";
import { useParams } from "react-router-dom";

export const useUpdateAsset = (id?: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    const { employeeId } = useParams()

    console.log(employeeId);

    return useMutation({
        mutationFn: async (data: AddAssetFormSchemaType) => {
            const queryParams = new URLSearchParams();
            if (employeeId) {
                queryParams.append('employee', employeeId);
            }

            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
            await apiClient.put(`/assets/${id}${queryString}`, data)
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
                title: "Assets updated successfully"
            })
        }
    })
}