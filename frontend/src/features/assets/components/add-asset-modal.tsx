import { useAddAsset } from "@/features/assets/api/use-add-asset";
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Asset } from "./asset-details";
import { useUpdateAsset } from "../api/use-update-asset";

const formSchema = z.object({
    category: z.string().min(1, { message: "Category is required" }), // Must not be empty
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }), // Minimum length validation
    serialno: z.string().regex(/^[A-Za-z0-9]+$/, { message: "Serial number must be alphanumeric" }), // Alphanumeric validation
    assignedDate: z.string().refine((date) => {
        return !isNaN(Date.parse(date));
    }, { message: "Assigned date must be a valid date in YYYY-MM-DD format" }) // Date validation
});


interface AssetModelProps {
    children?: React.ReactNode;
    existingAsset?: Asset
    employeeId?: string
}

export type AddAssetFormSchemaType = z.infer<typeof formSchema>;

export const AddAssetModel = ({ employeeId, children, existingAsset }: AssetModelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const mutation = existingAsset ? useUpdateAsset(existingAsset._id) : useAddAsset(employeeId)


    const form = useForm<AddAssetFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: existingAsset?.name || "",
            description: existingAsset?.description || "",
            serialno: existingAsset?.serialNo || "",
            assignedDate: existingAsset?.assignedAt ? existingAsset.assignedAt?.slice(0, 10) : "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = (values: AddAssetFormSchemaType) => {
        if (existingAsset) {
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

    const [maxDate, setMaxDate] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMaxDate(today);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
            <DialogTrigger asChild>
                {children || <Button
                    variant="addAction"
                    className="h-9 gap-2"
                ><PlusCircle size={17} />Add New Asset</Button>}
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
                                            <Input type="date" {...field} max={maxDate} />
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
                                    {existingAsset ? "Update" : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
