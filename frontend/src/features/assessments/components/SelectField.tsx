import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface SelectFieldProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    control: any;
}

export const SelectField = ({ name, label, options, control, }: SelectFieldProps) => {
    return (
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem className="flex-1">
                <FormLabel>{label}</FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
    );
};
