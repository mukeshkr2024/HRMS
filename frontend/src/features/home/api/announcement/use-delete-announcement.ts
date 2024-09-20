import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/api/api-client";

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
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete the announcement. Please try again.",
                variant: "destructive",
            });
        },
    });
};
