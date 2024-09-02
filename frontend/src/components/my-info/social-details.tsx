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
    linkdein: z.string(),
    twitter: z.string(),
    instagram: z.string(),
    facebook: z.string(),
})

type FormSchemaType = z.infer<typeof formSchema>;

const formFields: { name: keyof FormSchemaType; label: string; placeholder: string; type?: string; width?: string; }[] = [
    {
        name: "linkdein", label: "Linkedin", placeholder: "Address",
    },
    {
        name: "twitter", label: "Twitter", placeholder: "Country"
    }, {
        name: "instagram", label: "Instagram", placeholder: "State"
    }, {
        name: "facebook", label: "Facebook", placeholder: "Landmark",
    },
]

export default function SocialDetails() {

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            facebook: "",
            instagram: "",
            linkdein: "",
            twitter: "",
        }
    })

    const onSubmit = () => {

    }

    return (
        <section className="mt-8">
            <div className="flex gap-x-2 items-center">
                <img src="/icons/call-slash.svg" alt="Profile" className="size-5" />
                <p className="text-[#333333] font-semibold">Social Links</p>
            </div>
            <div className="mt-4 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap justify-between gap-y-2.5">
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
