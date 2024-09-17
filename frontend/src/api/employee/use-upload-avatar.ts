import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/context/useAuthStore";

export const useUploadAvatar = () => {
    const { toast } = useToast();
    // const queryClient = useQueryClient();
    const { refetchSession } = useAuthStore()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            try {
                await apiClient.post("/employees/avatar/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                } else {
                    throw new Error("An unknown error occurred.");
                }
            }
        },
        onError: (error: Error) => {
            toast({
                title: "Upload Failed",
                description: error.message || "Something went wrong, please try again.",
                variant: "destructive",
            });
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["employeeProfile"] });
            refetchSession()
            toast({
                title: "Profile updated successfully",
                description: "Your avatar has been updated.",
            });
        }
    });
};
