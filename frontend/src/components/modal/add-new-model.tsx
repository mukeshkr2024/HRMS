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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

interface AddNewDialogProps {
    fieldName: string;
    placeholder: string;
    label: string;
    formItemLabel: string;
    onSubmit: SubmitHandler<{ [key: string]: string }>;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = (fieldName: string) =>
    z.object({
        [fieldName]: z.string().min(1, `This is required`).max(255, ` must be at most 255 characters long`),
    });

export const AddNewDialog = ({
    fieldName,
    placeholder,
    label,
    formItemLabel,
    onSubmit,
    children,
    isOpen,
    setIsOpen
}: AddNewDialogProps) => {

    const form = useForm<{ [key: string]: string }>({
        resolver: zodResolver(formSchema(fieldName)),
        defaultValues: {
            [fieldName]: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(prevValue => !prevValue)}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="my-2">{label}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={fieldName}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{formItemLabel}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={placeholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mb-4 mt-4 flex gap-x-4">
                                <Button
                                    variant="outline"
                                    className="w-28"
                                    onClick={() => setIsOpen(prevValue => !prevValue)}
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