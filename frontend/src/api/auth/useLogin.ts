import { apiClient } from "@/api/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

type LoginData = {
  email: string;
  password: string;
};

export const useEmployeeLogin = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (loginData: LoginData) => {
      const { data } = await apiClient.post("/auth/login", loginData);
      return data;
    },
    onSuccess: () => {
      // login success toast
      toast({
        title: "Login successfully",
      })
      window.location.reload()
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Login failed",
      })
    },
  });

  return mutation;
};
