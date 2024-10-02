import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { getErrorMessage } from "@/utils";

export const useRequestFeedback = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: any) => {
            await apiClient.post("/feedbacks", values);
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
                title: "Feedback requested successfully",
            });
        },
    });
};
