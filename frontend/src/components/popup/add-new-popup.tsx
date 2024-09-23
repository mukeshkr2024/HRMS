import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { CirclePlus, X } from "lucide-react";
import { cn } from "@/utils/cn";


interface AddNewPopupProps {
    label: string,
    buttonLabel: string
    className?: string
    onSubmit: (value: any, onSuccess: () => void) => void
    isDisabled?: boolean
}


export function AddNewPopup({ buttonLabel, isDisabled, label, className, onSubmit }: AddNewPopupProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const formSchema = z.object({
        title: z.string().min(3, {
            message: "This field is required",
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const handleSuccess = () => {
        setIsOpen(false);
        form.reset();
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="font-normal flex items-center justify-center gap-x-2 text-[#313131] h-9 shadow-sm"
                    variant="outline"
                >
                    <CirclePlus size={18} /> {buttonLabel}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-96", className)}>
                <X
                    className="absolute right-2 top-2 cursor-pointer text-gray-500"
                    onClick={() => {
                        setIsOpen(false);
                        form.reset();
                    }}
                    size={18}
                />
                <div className="w-full flex flex-col gap-y-2.5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((values) => onSubmit(values, handleSuccess))}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-600">
                                            {label}</FormLabel>
                                        <Textarea {...field} />
                                        <FormMessage
                                            className="font-normal"
                                        />
                                    </FormItem>
                                )}
                            />
                            <Button
                                disabled={isDisabled || form.formState.isSubmitting}
                                className="w-full mt-2" type="submit">
                                {buttonLabel}
                            </Button>
                        </form>
                    </Form>
                </div>
            </PopoverContent>
        </Popover>
    );
}
