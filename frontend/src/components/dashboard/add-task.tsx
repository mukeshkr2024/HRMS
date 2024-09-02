import { useCreateTask } from "@/api/task/use-create-task";
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
import { Textarea } from "../ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { X } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title is required"
    }).max(255),
})


export const AddNewTaskPopup = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setisOpen] = useState(false)

    const { mutate } = useCreateTask()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate({
            title: values.title
        })
        setisOpen(false)

        form.reset()
    }
    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild onClick={() => setisOpen(true)}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 ml-5">
                <X className="absolute right-2 top-2 size-5 cursor-pointer text-gray-500" onClick={() => {
                    setisOpen(false)
                    form.reset()
                }} />
                <div className="w-full flex flex-col gap-y-2.5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Task Description</FormLabel>
                                        <Textarea  {...field} />
                                        <FormMessage />
                                        <Button className="w-full" type="submit" >Add Task</Button>
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
