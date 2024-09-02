import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";

type AnnouncementData = {
    description: string;
}

export const useCreateAnnouncement = () => {

    const { toast } = useToast()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (announcementData: AnnouncementData) => {
            await apiClient.post("/announcements", announcementData)
        },
        onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["announcements"] })
            toast({
                title: "Announcement created successfully"
            })
        }
    })
}