import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AnnouncementData = {
    description: string;
};

export const useCreateAnnouncement = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (announcementData: AnnouncementData) => {
            await apiClient.post("/announcements", announcementData);
        },
        onError: (error: unknown) => {
            const message = getErrorMessage(error)

            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["announcements"] });
            toast({
                title: "Announcement created successfully",
            });
        },
    });
};
