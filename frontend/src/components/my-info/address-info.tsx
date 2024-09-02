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
    address: z.string(),
    country: z.string(),
    state: z.string(),
    landmark: z.string(),
    phone: z.string(),
    city: z.string(),
    pincode: z.number(),
})

type FormSchemaType = z.infer<typeof formSchema>;

const formFields: { name: keyof FormSchemaType; label: string; placeholder: string; type?: string; width?: string; }[] = [
    {
        name: "address", label: "Address line 1", placeholder: "Address",
        width: "w-[450px]"
    },
    {
        name: "country", label: "Country", placeholder: "Country"
    }, {
        name: "state", label: "State", placeholder: "State"
    }, {
        name: "landmark", label: "Landmark", placeholder: "Landmark",
        width: "w-[450px]"
    }, {
        name: "city", label: "City", placeholder: "City"
    }, {
        name: "pincode", label: "Pin Code", placeholder: "Pin Code"
    }
]

export default function AddressInfo() {

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "Bokaro Steel City",
            country: "India",
            state: "Jharkhand",
            landmark: "Bokaro Steel City",
            city: "Bokaro",
            pincode: 827001,
        }
    })

    const onSubmit = () => {

    }

    return (
        <section className="mt-8">
            <div className="flex gap-x-2">
                <img src="/icons/profile-circle.svg" alt="Profile" />
                <p className="text-[#333333] font-semibold">Address</p>
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
                                                className={cn(width ? width : "w-56")}
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
