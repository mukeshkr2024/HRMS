import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/context/useAuthStore";
import { getErrorMessage } from "@/utils";

export const useUploadAvatar = () => {
    const { toast } = useToast();
    const { refetchSession } = useAuthStore();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            await apiClient.post("/employees/avatar/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onError: (error: any) => {
            const message = getErrorMessage(error, "Upload failed. Please try again."); // Use the utility function
            toast({
                title: "Upload Failed",
                description: message,
                variant: "destructive",
            });
        },
        onSuccess: () => {
            refetchSession();
            toast({
                title: "Profile updated successfully",
                description: "Your avatar has been updated.",
            });
        },
    });
};
