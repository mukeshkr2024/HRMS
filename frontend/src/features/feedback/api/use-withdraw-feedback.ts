import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { getErrorMessage } from "@/utils";

export const useWithdrawFeedback = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (feedbackRequestId: string) => {
            await apiClient.delete(`/feedbacks/${feedbackRequestId}`);
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast({
                variant: "destructive",
                title: message,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["member-feedbacks"] });
            toast({
                title: "Feedback request withdrawn successfully",
            });
        },
    });
};
