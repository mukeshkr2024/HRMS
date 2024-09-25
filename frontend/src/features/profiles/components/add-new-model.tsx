import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useCreateDepartment } from "@/features/departments/api/use-create-depatment";
import { useUpdateDepartment } from "@/features/departments/api/use-update-issue";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

const formSchema = z.object({
    name: z.string().min(1, "This field is required").max(255, "Name must be at most 255 characters long"),
    description: z.string().optional(),
});


export type DepartMentFormSchemaType = z.infer<typeof formSchema>;

interface AddDepartementModalProps {
    existingDepartement?: { name: string; description: string; _id: string };
    children?: React.ReactNode;
}

export const AddNewDepartment = ({ existingDepartement, children }: AddDepartementModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = existingDepartement ? useUpdateDepartment(existingDepartement?._id) : useCreateDepartment()
    const form = useForm<DepartMentFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: existingDepartement?.name || "",
            description: existingDepartement?.description || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: DepartMentFormSchemaType) => {
        if (existingDepartement) {
            mutation.mutate(values, {
                onSuccess: () => {
                    setIsOpen(false);
                    form.reset();
                }
            })

        } else {
            mutation.mutate(values, {
                onSuccess: () => {
                    setIsOpen(false);
                    form.reset();
                }
            })
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
            <DialogTrigger asChild>
                {children || <Button
                    variant="addAction"
                    className="h-9 gap-2"
                ><PlusCircle size={17} />Add New Department</Button>}
            </DialogTrigger>
            <DialogContent
                className="w-[90%] rounded-md"
            >
                <DialogHeader>
                    <DialogTitle className="my-2">{existingDepartement ? "Update Departement" : "Add New Department"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2.5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department Name</FormLabel>
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
                                    {existingDepartement ? "Update" : "Submit"}

                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
