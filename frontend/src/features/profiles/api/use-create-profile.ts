import { apiClient } from "@/api-client";
import { ProfileFormSchemaType } from "@/features/profiles/components/add-new-profile";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";

export const useCreateProfile = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ProfileFormSchemaType) => {
            await apiClient.post("/profiles/create", data)
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
                title: "Profile created successfully"
            })
        }
    })
}