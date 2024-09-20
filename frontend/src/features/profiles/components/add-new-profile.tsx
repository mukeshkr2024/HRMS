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
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import { useCreateProfile } from "@/features/profiles/api/use-create-profile";

const formSchema = z.object({
    name: z.string().min(1, "This field is required").max(255, "Name must be at most 255 characters long"),
    description: z.string().optional(),
});

export type ProfileFormSchemaType = z.infer<typeof formSchema>;

export const AddNewProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = useCreateProfile()

    const form = useForm<ProfileFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: ProfileFormSchemaType) => {
        mutation.mutate(values, {
            onSettled: () => {
                setIsOpen(false);
                form.reset();
            }
        })
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
            <DialogTrigger asChild>
                <Button
                    variant="addAction"
                    className="h-9 gap-2"
                ><PlusCircle size={17} />Add New Profile</Button>
            </DialogTrigger>
            <DialogContent
                className="w-[90%] rounded-md"
            >
                <DialogHeader>
                    <DialogTitle className="my-2">Add new Profile</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2.5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter department name" {...field} />
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
                                            <Textarea placeholder="Enter description (optional)" {...field} />
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
                                        setIsOpen(prev => !prev)
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
