import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddComment = (goaId: string) => {
    const queryClient = useQueryClient();
    const { toast } = useToast()
    return useMutation({
        mutationFn: async (commentData: any) => {
            const { data } = await apiClient.post(`/employee/goals/comment/${goaId}`, commentData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goal"] })
            toast({
                title: "Comment added successfully"
            })
        },
        onError: () => {
            toast({
                title: "Something went wrong , please try again",
            })
        }
    });
};
