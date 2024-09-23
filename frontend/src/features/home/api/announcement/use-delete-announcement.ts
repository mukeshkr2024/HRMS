import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/api-client";
import { getErrorMessage } from "@/utils";

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/announcements/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["announcements"] });

            toast({
                title: "Success",
                description: "The announcement was deleted successfully.",
            });
        },
        onError: (error) => {
            const message = getErrorMessage(error)

            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        },
    });
};
