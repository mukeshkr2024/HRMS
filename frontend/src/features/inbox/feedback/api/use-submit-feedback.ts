import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../../api-client";
import { getErrorMessage } from "@/utils";

export const useSubmitFeedback = (id: string) => {
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (values: any) => {
            await apiClient.put(`/feedbacks/submit/${id}`, values);
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast({
                variant: "destructive",
                title: message,
            });
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["member-feedbacks"] }); // TODO:
            toast({
                title: "Feedback submitted successfully",
            });
        },
    });
};
