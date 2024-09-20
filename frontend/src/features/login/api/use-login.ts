import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

type LoginData = {
    email: string;
    password: string;
};

export const useEmployeeLogin = () => {
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: async (loginData: LoginData) => {
            const response = await apiClient.post("/auth/login", loginData);
            return response.data;
        },
        onSuccess: (data) => {
            const { access_token } = data;
            if (access_token) {
                Cookies.set('access_token', access_token, { expires: 1 });
                toast({
                    title: "Login successful",
                });
                window.location.reload();
            }
        },
        onError: (error: any) => {
            const message = getErrorMessage(error, "Login failed")
            toast({
                variant: "destructive",
                title: message,
            });
        },
    });

    return mutation;
};
