
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
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FileUploadDialogProps {
    label: string;
    formItemLabel: string;
    onSubmit: SubmitHandler<{ file: File | null }>;
    children: React.ReactNode;
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    isPending: boolean
}

const fileSchema = z.object({
    file: z.instanceof(File).nullable().refine(file => file !== null, "File is required"),
});

export const FileUploadDialog = ({
    label,
    onSubmit,
    children,
    isOpen,
    setIsOpen,
    isPending
}: FileUploadDialogProps) => {

    const form = useForm<{ file: File | null }>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            file: null,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="w-[90%]"
            >
                <DialogHeader>
                    <DialogTitle className="my-2">{label}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    field.onChange(file);
                                                }}
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
                                    onClick={() => setIsOpen(false)}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="w-28"
                                    disabled={isSubmitting || !isValid || isPending}
                                    type="submit"
                                >
                                    Upload
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
