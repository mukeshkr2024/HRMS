import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileFormSchemaType } from "../components/add-new-profile";

export const useUpdateProfile = (id: string) => {

    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ProfileFormSchemaType) => {
            await apiClient.put(`/profiles/${id}`, data)
        },
        onError: (error) => {
            const message = getErrorMessage(error)
            toast({
                variant: "destructive",
                title: message
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profiles"] })
            toast({
                title: "Profile updated successfully"
            })
        }
    })
}