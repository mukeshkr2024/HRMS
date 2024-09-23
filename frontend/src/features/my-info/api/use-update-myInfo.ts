import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils";
import { EmployeeFormSchemaType } from "..";
import { EditEmployeeFormSchemaType } from "@/features/employee/info";

export const useUpdateMyInfo = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (infoData: EmployeeFormSchemaType | EditEmployeeFormSchemaType) => {
            const { data } = await apiClient.put(`/employees/my-info`, infoData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employee"] });
            toast({
                title: "Your information has been updated successfully",
            });
        },
        onError: (error) => {
            const message = getErrorMessage(error);
            toast({
                variant: "destructive",
                title: message,
            });
        },
    });
};
