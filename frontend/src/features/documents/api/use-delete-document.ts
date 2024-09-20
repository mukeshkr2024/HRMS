import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDocument = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            console.log(data);
            await apiClient.delete(`/documents/delete`, { data })
        },
        onError: (error: any) => {
            console.log("error", error);
            toast({
                variant: "destructive",
                title: error?.response?.data?.message || "Something went wrong"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] })
            toast({
                title: "Files deleted successfully"
            })
        }
    })
}  