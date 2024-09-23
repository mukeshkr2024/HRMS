import { useAddAsset } from "@/features/assets/api/use-add-depatment";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

const formSchema = z.object({
    category: z.string(),
    description: z.string(),
    serialno: z.string(),
    assignedDate: z.string()
});

export type AddAssetFormSchemaType = z.infer<typeof formSchema>;

export const AddAssetModel = ({ employeeId }: { employeeId?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = useAddAsset(employeeId)

    const form = useForm<AddAssetFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
            description: "",
            serialno: "",
            assignedDate: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: AddAssetFormSchemaType) => {
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
                ><PlusCircle size={17} />Add New Asset</Button>
            </DialogTrigger>
            <DialogContent
                className="w-full max-w-lg p-6 md:p-8 lg:p-10"
                style={{
                    overflowY: "auto",
                }}
            >
                <DialogHeader>
                    <DialogTitle className="my-2">Add new Asset</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2.5">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category" {...field} />
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
                            <FormField
                                control={form.control}
                                name="serialno"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Serial Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter serial number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="assignedDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assigned Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
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
