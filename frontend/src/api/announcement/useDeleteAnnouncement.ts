import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { useToast } from "@/components/ui/use-toast";

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`/announcements/${id}`)
        },
        onSuccess: () => {
            // invalidate the cache
            queryClient.invalidateQueries({ queryKey: ["announcements"] })
            toast({
                title: "Announcement deleted successfully"
            })
        }
        , onError: () => {
            console.log("Error deleting announcement")
        }
    })
}