import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { CustomInput } from "../shared/custom-input";

const formSchema = z.object({
    employeeNumber: z.string(),
    status: z.string(),
    designation: z.string(),
    team: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    preferredName: z.string(),
    birthDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    gender: z.string(),
    maritalStatus: z.string(),
    shirtSize: z.number(),
    SSN: z.string(),
    NIN: z.number(),
    TaxFileNumber: z.number(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const formFields: { name: keyof FormSchemaType; label: string; placeholder: string; type?: string }[] = [
    { name: "employeeNumber", label: "Employee No.", placeholder: "shadcn" },
    { name: "status", label: "Status", placeholder: "shadcn" },
    { name: "designation", label: "Designation", placeholder: "shadcn" },
    { name: "team", label: "Team", placeholder: "shadcn" },
    { name: "firstName", label: "First name", placeholder: "shadcn" },
    { name: "middleName", label: "Middle name", placeholder: "shadcn" },
    { name: "lastName", label: "Last name", placeholder: "shadcn" },
    { name: "preferredName", label: "Preferred name", placeholder: "shadcn" },
    { name: "birthDate", label: "Birth Date", placeholder: "YYYY-MM-DD", type: "date" },
    { name: "gender", label: "Gender", placeholder: "shadcn" },
    { name: "maritalStatus", label: "Marital Status", placeholder: "shadcn" },
    { name: "shirtSize", label: "Shirt Size", placeholder: "shadcn" },
    { name: "SSN", label: "SSN", placeholder: "shadcn" },
    { name: "NIN", label: "NIN", placeholder: "shadcn" },
    { name: "TaxFileNumber", label: "Tax File Number", placeholder: "shadcn" },
];

export const BasicInformation = () => {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeNumber: "CP0005",
            status: "ACTIVE",
            designation: "Full-Stack Developer",
            team: "Developement",
            firstName: "Mukesh",
            middleName: "",
            lastName: "Kumar",
            preferredName: "",
            birthDate: "01-01-2005",
            gender: "Male",
            maritalStatus: "UnMarried",
            shirtSize: 0,
            SSN: "",
            NIN: 0,
            TaxFileNumber: 0,
        },
    });

    const onSubmit = (data: FormSchemaType) => {
        console.log(data);
    };

    return (
        <section className="mt-8">
            <div className="flex gap-x-2">
                <img src="/icons/profile-circle.svg" alt="Profile" />
                <p className="text-[#333333] font-semibold">Basic Information</p>
            </div>
            <div className="mt-4 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2.5">
                        {formFields.map(({ name, label, placeholder, type }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">{label}</FormLabel>
                                        <FormControl>
                                            <CustomInput
                                                placeholder={placeholder}
                                                type={type || "text"}
                                                {...field}
                                                value={
                                                    name === "birthDate"
                                                        ? (field.value as string).substring(0, 10)
                                                        : field.value
                                                }
                                                onError={!!fieldState.error}
                                                className="w-[220px]"
                                                readOnly={true}
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
    );
};
