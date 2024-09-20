import { EmployeeFormSection } from "@/components/form/employee-form-section";
import { EmployeeFormFieldWrapper } from "@/components/form/employee-form-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useGetEmployee } from "@/features/my-info/api/use-get-employeeInfo";
import { useUpdateMyInfo } from "@/features/my-info/api/use-update-myInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    employeeNumber: z.string().nonempty("Employee number is required"),
    status: z.string(),
    personalInformation: z.object({
        firstName: z.string().nonempty("First name is required"),
        middleName: z.string().optional(),
        lastName: z.string().nonempty("Last name is required"),
        preferredName: z.string().optional(),
        birthDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
        gender: z.string().nonempty("Gender is required"),
        maritalStatus: z.string().nonempty("Marital status is required"),
        uan: z.string().min(12, "UAN must be 12-25 characters").optional(),
        pan: z.string().min(10, "Pan must be 10 characters").optional(),
    }),
    address: z.object({
        street1: z.string().nonempty("Street address is required"),
        street2: z.string().optional(),
        city: z.string().nonempty("City is required"),
        state: z.string().nonempty("State is required"),
        zipCode: z.string().nonempty("Zip code is required").length(6, "Zip code must be 6 digits"),
        country: z.string().nonempty("Country is required"),
    }),
    contactInformation: z.object({
        workPhone: z.string().optional(),
        mobilePhone: z.string().optional(),
        homePhone: z.string().optional(),
        workEmail: z.string().optional(),
        homeEmail: z.string().optional(),
    }),
    languages: z.array(z.object({
        name: z.string().nonempty("Language is required"),
    })).optional(),
    educations: z.array(z.object({
        college: z.string().nonempty("College is required"),
        degree: z.string().nonempty("Degree is required"),
        specialization: z.string().optional(),
        gpa: z.string().optional(),
        startDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid start date format" }),
        endDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid end date format" }),
    })).optional(),
    position: z.string().nonempty("Job title is required"),
    department: z.string().nonempty("Job title is required"),
});

export type EmployeeFormSchemaType = z.infer<typeof formSchema>;

export const MyInfo = () => {
    const { data, isLoading } = useGetEmployee();
    const mutation = useUpdateMyInfo()

    const form = useForm<EmployeeFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeNumber: "",
            status: "",
            personalInformation: {
                firstName: "",
                middleName: "",
                lastName: "",
                preferredName: "",
                birthDate: "",
                gender: "",
                maritalStatus: "",
                uan: "",
                pan: "",
            },
            address: {
                street1: "",
                street2: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
            },
            contactInformation: {
                workPhone: "",
                mobilePhone: "",
                homePhone: "",
                workEmail: "",
                homeEmail: "",
            },
            languages: [{ name: "" }],
            educations: [{}]
        }
    });

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "languages",
    });

    const { fields: educationFields, append: appendEducation } = useFieldArray({
        control: form.control,
        name: "educations",
    });

    useEffect(() => {
        if (data) {
            const formatDate = (dateString: string) => {
                const date = new Date(dateString);
                return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
            };

            form.reset({
                employeeNumber: data?.employeeNumber || "",
                status: data?.status || "",
                personalInformation: {
                    firstName: data?.personalInformation?.firstName || "",
                    middleName: data?.personalInformation?.middleName || "",
                    lastName: data?.personalInformation?.lastName || "",
                    preferredName: data?.personalInformation?.preferredName || "",
                    birthDate: formatDate(data?.personalInformation?.dateOfBirth) || "",
                    gender: data?.personalInformation?.gender || "",
                    maritalStatus: data?.personalInformation?.maritalStatus || "",
                    uan: data?.personalInformation?.uan || "",
                    pan: data?.personalInformation?.pan || "",
                },
                address: {
                    street1: data?.address?.street1 || "",
                    street2: data?.address?.street2 || "",
                    city: data?.address?.city || "",
                    state: data?.address?.state || "",
                    zipCode: data?.address?.zipCode || "",
                    country: data?.address?.country || "",
                },
                contactInformation: {
                    workPhone: data?.contactInformation?.workPhone || "",
                    mobilePhone: data?.contactInformation?.mobilePhone || "",
                    homePhone: data?.contactInformation?.homePhone || "",
                    workEmail: data?.contactInformation?.workEmail || "",
                    homeEmail: data?.contactInformation?.homeEmail || "",
                },
                languages: data?.languages?.map((language: string) => {
                    return {
                        name: language
                    }
                }) || [{ name: "" }],
                educations: data?.educations?.map((edu: any) => {
                    return {
                        college: edu.college,
                        degree: edu.degree,
                        specialization: edu.specialization,
                        gpa: edu.gpa,
                        startDate: formatDate(edu.startDate),
                        endDate: formatDate(edu.endDate),
                    }
                }) || [{
                    college: "",
                    degree: "",
                    specialization: "",
                    gpa: "",
                    startDate: "",
                    endDate: "",
                }],
                department: data?.department?.name || "",
                position: data?.position?.name || "",
            });
        }
    }, [data, form]);

    const onSubmit = (values: EmployeeFormSchemaType) => {
        console.log(values);
        mutation.mutate(values)
    };

    console.log(form.formState.errors);


    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center h-screen">
                <Loader
                    className="animate-spin text-muted-foreground"
                />
            </div>
        );
    }
    return (
        <div className="w-full">
            <div className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        {/* Personal Information Section */}
                        <EmployeeFormSection title="Basic Information" icon="/icons/profile-circle.svg">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <EmployeeFormFieldWrapper
                                    control={form.control} name="employeeNumber" label="Employee No."
                                    isReadOnly={true}
                                />
                                <EmployeeFormFieldWrapper control={form.control} name="status" label="Status" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="position" label="Designation" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="department" label="Department" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.firstName" label="First name" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.middleName" label="Middle name" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.lastName" label="Last name" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.preferredName" label="Preferred name" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.birthDate" label="Birth Date" type="date" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.gender" label="Gender" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.maritalStatus" label="Marital Status" isReadOnly={true} />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.uan" label="UAN" />
                                <EmployeeFormFieldWrapper control={form.control} name="personalInformation.pan" label="PAN" />
                            </div>
                        </EmployeeFormSection>

                        {/* Address Section */}
                        <EmployeeFormSection title="Address" icon="/icons/home-2.svg">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                <EmployeeFormFieldWrapper control={form.control} name="address.street1" label="Street Address" />
                                <EmployeeFormFieldWrapper control={form.control} name="address.street2" label="Apt/Suite" />
                                <EmployeeFormFieldWrapper control={form.control} name="address.city" label="City" />
                                <EmployeeFormFieldWrapper control={form.control} name="address.state" label="State" />
                                <EmployeeFormFieldWrapper control={form.control} name="address.zipCode" label="Zip Code" />
                                <EmployeeFormFieldWrapper control={form.control} name="address.country" label="Country" />
                            </div>
                        </EmployeeFormSection>

                        {/* Contact Information Section */}
                        <EmployeeFormSection title="Contact Information" icon="/icons/call-slash.svg">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                                <EmployeeFormFieldWrapper control={form.control} name="contactInformation.workPhone" label="Work Phone" />
                                <EmployeeFormFieldWrapper control={form.control} name="contactInformation.mobilePhone" label="Mobile Phone" />
                                <EmployeeFormFieldWrapper control={form.control} name="contactInformation.homePhone" label="Home Phone" />
                                <EmployeeFormFieldWrapper control={form.control} name="contactInformation.workEmail" label="Work Email" />
                                <EmployeeFormFieldWrapper control={form.control} name="contactInformation.homeEmail" label="Home Email" />
                            </div>
                        </EmployeeFormSection>

                        <EmployeeFormSection title="Social Links" icon="/icons/call-slash.svg">
                            <div className="grid lg:grid-cols-4 gap-4 max-w-5xl">
                                <EmployeeFormFieldWrapper control={form.control} name="socialLinks.linkedin" label="LinkedIn" />
                                <EmployeeFormFieldWrapper control={form.control} name="socialLinks.twitter" label="Twitter" />
                                <EmployeeFormFieldWrapper control={form.control} name="socialLinks.instagram" label="Instagram" />
                                <EmployeeFormFieldWrapper control={form.control} name="socialLinks.facebook" label="Facebook" />
                            </div>
                        </EmployeeFormSection>

                        <EmployeeFormSection title="Education" icon="/icons/book.svg">
                            <div className="gap-4 grid lg:grid-cols-2">
                                {educationFields.map((item, index) => (
                                    <Card key={item.id} className="space-y-2 p-5 bg-[#F7F8FA]">
                                        <div className="grid grid-cols-2 gap-4">
                                            <EmployeeFormFieldWrapper
                                                control={form.control}
                                                name={`educations.${index}.college`}
                                                label="College"
                                            />
                                            <EmployeeFormFieldWrapper
                                                control={form.control}
                                                name={`educations.${index}.degree`}
                                                label="Degree"
                                            />
                                            <EmployeeFormFieldWrapper
                                                control={form.control}
                                                name={`educations.${index}.specialization`}
                                                label="Specialization"
                                            />
                                            <EmployeeFormFieldWrapper
                                                control={form.control}
                                                name={`educations.${index}.gpa`}
                                                label="GPA"
                                            />
                                            <EmployeeFormFieldWrapper
                                                control={form.control}
                                                name={`educations.${index}.startDate`}
                                                label="Start Date"
                                                type="date"
                                            />
                                            <EmployeeFormFieldWrapper
                                                control={form.control}
                                                name={`educations.${index}.endDate`}
                                                label="End Date"
                                                type="date"
                                            />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <div className="w-full flex  mt-4 items-center justify-end">
                                <Button
                                    variant="saveAction"
                                    type="button"
                                    className="h-9"
                                    onClick={() => appendEducation({
                                        college: "",
                                        degree: "",
                                        specialization: "",
                                        gpa: "",
                                        startDate: "",
                                        endDate: "",
                                    })}
                                >
                                    <PlusCircle size={17} /> Add Education
                                </Button>
                            </div>
                        </EmployeeFormSection>

                        {/* Languages Section */}
                        <EmployeeFormSection title="Languages" icon="/icons/book.svg">
                            <div className="flex items-end gap-4 flex-wrap">
                                {fields.map((item, index) => (
                                    <div key={item.id} className="">
                                        <EmployeeFormFieldWrapper
                                            control={form.control}
                                            name={`languages.${index}.name`}
                                            label={`Language ${index + 1}`}
                                        />
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() => append({ name: "" })}
                                    variant="saveAction"
                                    className="h-9"
                                >
                                    <PlusCircle size={16} />   Add Language
                                </Button>
                            </div>
                        </EmployeeFormSection>
                        {/* Form Submit Button */}
                        <Button
                            type="submit"
                            variant={"saveAction"}
                            className="h-9 px-8 mt-6"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
