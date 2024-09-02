import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useCreateAnnouncement } from "@/api/announcement/useCreateAnnouncement";
import { X } from "lucide-react";


const formSchema = z.object({
    description: z.string().min(3, {
        message: "Description is required"
    }).max(255),
})


export function AddNewAnnouncementPopup({ children }: { children: React.ReactNode }) {
    const [isOpen, setisOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        }
    })

    const { mutate } = useCreateAnnouncement()

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate({
            description: values.description
        })
        setisOpen(false)
        form.reset()
    }

    return (
        <Popover
            open={isOpen}
        >
            <PopoverTrigger asChild onClick={() => { setisOpen(true) }}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-96 ">
                <X className="absolute right-2 top-2 size-5 cursor-pointer text-gray-500" onClick={() => {
                    setisOpen(false)
                    form.reset()
                }} />
                <div className="w-full flex flex-col gap-y-2.5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-gray-600">New Announcements</FormLabel>
                                        <Textarea  {...field} />
                                        <FormMessage />
                                        <Button className="w-full" type="submit" >Add Announcements</Button>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </PopoverContent>
        </Popover >
    )
}
