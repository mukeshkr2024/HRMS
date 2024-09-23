import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProfile = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (profileId: string) => {
            await apiClient.delete(`/profiles/${profileId}`)
        },
        onError: (error) => {
            const message = getErrorMessage(error)
            toast({
                variant: "destructive",
                title: message,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profiles"] })
            toast({
                title: "Profile deleted successfully"
            })
        }
    })
}  