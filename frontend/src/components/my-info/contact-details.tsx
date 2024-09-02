import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { CustomInput } from "../shared/custom-input";
import { cn } from "@/utils/cn";

const formSchema = z.object({
    workNumber: z.string(),
    personalNumber: z.string(),
    emergencyNumber: z.string(),
    workMail: z.string(),
    personalEmail: z.string(),
})

type FormSchemaType = z.infer<typeof formSchema>;

const formFields: { name: keyof FormSchemaType; label: string; placeholder: string; type?: string; width?: string; }[] = [
    {
        name: "workMail", label: "Work number", placeholder: "Address",
    },
    {
        name: "personalEmail", label: "Personal number", placeholder: "Country"
    }, {
        name: "emergencyNumber", label: "Emergency Number (Home)", placeholder: "State"
    }, {
        name: "workMail", label: "Work Email", placeholder: "Landmark",
    }, {
        name: "personalEmail", label: "Personal Email", placeholder: "City"
    },
]

export default function ContactDetails() {

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emergencyNumber: "",
            personalEmail: "",
            workMail: "",
            personalNumber: "",
            workNumber: "",
        }
    })

    const onSubmit = () => {

    }

    return (
        <section className="mt-8">
            <div className="flex gap-x-2 items-center">
                <img src="/icons/call-slash.svg" alt="Profile" className="size-5" />
                <p className="text-[#333333] font-semibold">Contact Details</p>
            </div>
            <div className="mt-4 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-y-2.5 max-w-4xl">
                        {formFields.map(({ name, label, placeholder, type, width }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field, }) => (
                                    <FormItem>
                                        <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">{label}</FormLabel>
                                        <FormControl>
                                            <CustomInput
                                                placeholder={placeholder}
                                                type={type || "text"}
                                                {...field}
                                                className={cn(width ? width : "w-[250px]")}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </form>
                </Form>
            </div>
        </section>
    )
}
