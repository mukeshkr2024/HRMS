import { useToast } from "@/components/ui/use-toast";
import { EmployeeFormSchemaType } from "@/pages/employees/NewEmployeePage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export const useCreateEmployee = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: EmployeeFormSchemaType) => {
            await apiClient.post("/employees/create", values)
        },
        onError: () => {
            toast({
                title: "Something went wrong , please try again"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] })
            toast({
                title: "Employee created Successfully"
            })
        }
    })
}