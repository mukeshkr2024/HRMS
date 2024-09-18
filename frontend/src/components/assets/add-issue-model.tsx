import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useAddIssue } from "@/api/assets/use-add-issue";

const formSchema = z.object({
    title: z.string().min(4,),
    description: z.string().min(4),
});

export type AddIssueFormSchemaType = z.infer<typeof formSchema>;

export const AddIssueModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = useAddIssue()

    const form = useForm<AddIssueFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: AddIssueFormSchemaType) => {
        mutation.mutate(values, {
            onSettled: () => {
                setIsOpen(false);
                form.reset();
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
            <DialogTrigger asChild>
                <Button
                    variant="addAction"
                    className="h-9 gap-2"
                ><PlusCircle size={17} />New Issue</Button>
            </DialogTrigger>
            <DialogContent
                className="w-full max-w-lg p-6 md:p-8"
                style={{
                    overflowY: "auto",
                }}
            >
                <DialogHeader>
                    <DialogTitle className="my-2">Add new Issue</DialogTitle>
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
                                            <Textarea placeholder="Enter description" {...field} />
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
                                        setIsOpen(prev => !prev);
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
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
