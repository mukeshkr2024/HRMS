import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAnnouncement } from "../api/announcement/use-create-announcement";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    description: z
        .string()
        .min(3, { message: "Description is required" })
        .max(255),
});

interface AddNewAnnouncementPopupProps {
    children: React.ReactNode;
}

export function AddNewAnnouncementPopup({ children }: AddNewAnnouncementPopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        },
    });

    const { mutate } = useCreateAnnouncement();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate({ description: values.description });
        closeForm();
    };

    const closeForm = () => {
        setIsOpen(false);
        form.reset();
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-96">
                <X
                    className="absolute right-2 top-2 cursor-pointer text-gray-500"
                    onClick={closeForm}
                />
                <div className="w-full flex flex-col gap-y-2.5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-600">
                                            New Announcement
                                        </FormLabel>
                                        <Textarea {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-4" type="submit">
                                Add Announcement
                            </Button>
                        </form>
                    </Form>
                </div>
            </PopoverContent>
        </Popover>
    );
}
