import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CustomInput } from "@/components/shared/custom-input";
import { UseFormReturn } from "react-hook-form";

interface EmployeeFormFieldWrapperProps {
    control: UseFormReturn<any>["control"];
    name: string;
    label: string;
    type?: string;
    className?: string
    isReadOnly?: boolean;
}

export const EmployeeFormFieldWrapper: React.FC<EmployeeFormFieldWrapperProps> = ({ control, className, name, label, type = "text", isReadOnly = false }) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">{label}</FormLabel>
                <FormControl>
                    <CustomInput {...field} type={type} className={className} readOnly={isReadOnly} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);
