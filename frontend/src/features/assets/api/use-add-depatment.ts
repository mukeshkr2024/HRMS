import { apiClient } from "@/api-client";
import { AddAssetFormSchemaType } from "@/features/assets/components/add-asset-modal";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddAsset = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AddAssetFormSchemaType) => {
            await apiClient.post("/assets/add", data)
        },
        onError: (error) => {
            console.log("error", error);
            toast({
                variant: "destructive",
                title: error.message || "Something went wrong"
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