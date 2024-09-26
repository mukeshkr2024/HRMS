import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import { useAddIssue } from "../api/use-add-issue";
import { useUpdateIssue } from "../api/issues/use-update-issue";

const formSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(4),
});

export type IssueFormSchemaType = z.infer<typeof formSchema>;

interface AddIssueModalProps {
    existingIssue?: { title: string; description: string; _id: string };
    children?: React.ReactNode;
}

export const AddIssueModal = ({ existingIssue, children }: AddIssueModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = existingIssue ? useUpdateIssue(existingIssue?._id) : useAddIssue();

    const form = useForm<IssueFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: existingIssue?.title || "",
            description: existingIssue?.description || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {
        if (existingIssue) {
            form.reset({
                title: existingIssue?.title,
                description: existingIssue?.description,
            })
        } else {
            form.reset({
                title: "",
                description: "",
            })
        }
    }, [
        existingIssue, form
    ])

    const onSubmit = (values: IssueFormSchemaType) => {
        if (existingIssue) {
            mutation.mutate({ ...values }, {
                onSettled: () => {
                    setIsOpen(false);
                    form.reset();
                }
            });
        } else {
            mutation.mutate(values, {
                onSettled: () => {
                    setIsOpen(false);
                    form.reset();
                }
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="addAction" className="h-9 gap-2">
                        <PlusCircle size={17} />{existingIssue ? "Edit Issue" : "New Issue"}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                className="w-full max-w-lg p-6 md:p-8"
                style={{
                    overflowY: "auto",
                }}
            >
                <DialogHeader>
                    <DialogTitle className="my-2">{existingIssue ? "Edit Issue" : "Add New Issue"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2.5">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Issue Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter description" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mb-4 mt-4 flex gap-x-4">
                                <Button
                                    variant="outline"
                                    className="w-28"
                                    onClick={() => {
                                        setIsOpen(false);
                                        form.reset();
                                    }}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="w-28"
                                    disabled={isSubmitting || !isValid}
                                    type="submit"
                                >
                                    {existingIssue ? "Update" : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
