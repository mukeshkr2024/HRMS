import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CustomInput } from "@/components/shared/custom-input";
import { UseFormReturn } from "react-hook-form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandInput,
    CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface EmployeeFormFieldWrapperProps {
    control: UseFormReturn<any>["control"];
    name: string;
    label: string;
    type?: string;
    className?: string;
    isReadOnly?: boolean;
    options?: { value: string; label: string }[];
    useCombobox?: boolean;
}

export const EmployeeFormFieldWrapper: React.FC<EmployeeFormFieldWrapperProps> = ({
    control,
    className,
    name,
    label,
    type = "text",
    isReadOnly = false,
    options,
    useCombobox = false,
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">{label}</FormLabel>
                    <FormControl>
                        {options && useCombobox ? (
                            // Combobox Implementation
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                    >
                                        {value
                                            ? options.find((option) => option.value === value)?.label
                                            : `Select ${label}...`}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder={`Search ${label}...`} />
                                        <CommandList>
                                            <CommandEmpty>No {label} found.</CommandEmpty>
                                            <CommandGroup>
                                                {options.map((option) => (
                                                    <CommandItem
                                                        key={option.value}
                                                        value={option.value}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue);
                                                            field.onChange(currentValue);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value === option.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {option.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        ) : options ? (
                            <Select {...field} onValueChange={field.onChange}>
                                <SelectTrigger className={className}>
                                    <SelectValue placeholder={`Select ${label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{label}</SelectLabel>
                                        {options.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <CustomInput {...field} type={type} className={className} readOnly={isReadOnly} />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
