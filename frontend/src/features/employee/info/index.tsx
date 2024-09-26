import { EmployeeFormSection } from "@/components/form/employee-form-section";
import { EmployeeFormFieldWrapper } from "@/components/form/employee-form-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGetEmployeeOptions } from "@/features/employees/api/use-get-employeeOptions";
import { useUpdateEmployeeInfo } from "@/features/employees/api/use-update-employee";
import { emailPattern } from "@/features/my-info";
import { useGetEmployee } from "@/features/my-info/api/use-get-employeeInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const formSchema = z.object({
    employeeNumber: z
        .string()
        .nonempty("Employee number is required")
        .min(5, "Employee number must be at least 5 characters long")
        .max(10, "Employee number must not exceed 10 characters")
        .regex(/^[A-Za-z0-9]+$/, "Employee number must contain only alphanumeric characters"),
    personalInformation: z.object({
        firstName: z
            .string()
            .nonempty("First name is required")
            .min(2, "First name must be at least 2 characters long")
            .max(50, "First name must be at most 50 characters long")
            .regex(/^[a-zA-Z]+$/, "First name must only contain letters"),
        middleName: z
            .string()
            .regex(/^[a-zA-Z]*$/, "Middle name must only contain letters")
            .optional(),
        lastName: z
            .string()
            .nonempty("Last name is required")
            .min(2, "Last name must be at least 2 characters long")
            .max(50, "Last name must be at most 50 characters long")
            .regex(/^[a-zA-Z]+$/, "Last name must only contain letters"),
        preferredName: z.string().regex(/^[a-zA-Z]*$/, "Middle name must only contain letters")
            .optional(),
        birthDate: z.string()
            .refine(date => !isNaN(Date.parse(date)), { message: "Invalid date format" })
            .refine(date => new Date(date) < new Date(), { message: "Birth date must be in the past" }),
        gender: z.enum(["male", "female", "other"], {
            required_error: "Gender is required",
            invalid_type_error: "Gender must be one of the valid options (male, female, other)"
        }),
        maritalStatus: z.string(),
        uan: z.string()
            .min(12, "UAN must be at least 12 characters long")
            .max(25, "UAN must be at most 25 characters long")
            .regex(/^[0-9]{12,25}$/, "UAN must be a numeric string of 12 to 25 digits")
            .optional(),
        pan: z.string()
            .length(10, "PAN must be exactly 10 characters")
            .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "PAN must be in the format: 5 letters, 4 digits, and 1 letter")
            .optional(),
    }),
    address: z.object({
        street1: z.string().nonempty("Street address is required"),
        street2: z.string().optional(),
        city: z.string().nonempty("City is required"),
        state: z.string().nonempty("State is required"),
        zipCode: z.string()
            .nonempty("Zip code is required")
            .length(6, "Zip code must be exactly 6 digits")
            .regex(/^[0-9]{6}$/, "Zip code must be a 6-digit number"),
        country: z.string()
            .nonempty("Country is required")
            .regex(/^[A-Za-z\s\-]+$/, "Country name must only contain letters, spaces, or hyphens"),
    }),
    compensation: z.object({
        paySchedule: z.string().nonempty("Pay schedule is required"),
        payType: z.string().nonempty("Pay type is required"),
        payRate: z.coerce.number().gte(0, {
            message: "Pay rate must be a positive number."
        }),
        payRateType: z.string(),
    }),
    contactInformation: z.object({
        workPhone: z.string()
            .nonempty("Work phone number is required")
            .regex(/^\+?[1-9]\d{1,14}$/, "Invalid work phone number. It must be a valid international format."),
        mobilePhone: z.string()
            .regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile phone number. It must be a valid international format.")
            .optional(),
        homePhone: z.string()
            .regex(/^\+?[1-9]\d{1,14}$/, "Invalid home phone number. It must be a valid international format.")
            .optional(),
        workEmail: z.string()
            .nonempty("Work email address is required")
            .email("Invalid work email address")
            .regex(emailPattern, "Invalid work email format."),
        homeEmail: z.string()
            .email("Invalid home email address")
            .regex(emailPattern, "Invalid home email format.")
            .optional()
    }),
    jobDetails: z.object({
        hireDate: z.string()
            .refine(date => dateRegex.test(date), { message: "Invalid hire date format. Use YYYY-MM-DD." })
            .refine(date => !isNaN(Date.parse(date)), { message: "Invalid hire date." })
            .refine(date => new Date(date) <= new Date(), { message: "Hire date cannot be in the future." })
            .refine(date => new Date(date).getFullYear() > 2000, { message: "Hire date must be after the year 2000." }),
        employmentStatus: z.string().nonempty("Employment status is required"),
    }),
    jobInformation: z.object({
        jobTitle: z.string().nonempty("Job title is required"),
        reportsTo: z.string().nonempty("Reports to is required"),
        department: z.string().nonempty("Department is required"),
    }),
    role: z.string().nonempty("Role is required"),
    workLocation: z.string().nonempty("Location is required"),
    password: z.string().optional()
        .refine(val => val === undefined || val.length >= 8, {
            message: "Password must be at least 8 characters long",
        })
        .refine(val => val === undefined || /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine(val => val === undefined || /[a-z]/.test(val), {
            message: "Password must contain at least one lowercase letter",
        })
        .refine(val => val === undefined || /\d/.test(val), {
            message: "Password must contain at least one digit",
        })
        .refine(val => val === undefined || /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must contain at least one special character",
        })
});

export type EditEmployeeFormSchemaType = z.infer<typeof formSchema>;

export const EmployeeInfo = () => {
    const { employeeId } = useParams()
    const { data: employeeData, isLoading } = useGetEmployee(employeeId);
    const mutation = useUpdateEmployeeInfo(employeeId!)
    const { data } = useGetEmployeeOptions()
    const navigate = useNavigate()
    const form = useForm<EditEmployeeFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            employeeNumber: "",
            personalInformation: {
                firstName: "",
                middleName: "",
                lastName: "",
                preferredName: "",
                birthDate: "",
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
            compensation: {
                paySchedule: "",
                payType: "",
                payRateType: "hourly",
            },
            contactInformation: {
                workPhone: "",
                mobilePhone: "",
                homePhone: "",
                workEmail: "",
                homeEmail: "",
            },
            jobDetails: {
                hireDate: new Date().toISOString().split("T")[0],
                employmentStatus: "",
            },
            jobInformation: {
                jobTitle: "",
                reportsTo: "",
                department: "",
            },
            role: "",
            workLocation: "",
        }
    });


    useEffect(() => {
        if (employeeData) {
            const formatDate = (dateString: string) => {
                const date = new Date(dateString);
                return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
            };

            form.reset({
                employeeNumber: employeeData?.employeeNumber || "",
                personalInformation: {
                    firstName: employeeData?.personalInformation?.firstName || "",
                    middleName: employeeData?.personalInformation?.middleName || "",
                    lastName: employeeData?.personalInformation?.lastName || "",
                    preferredName: employeeData?.personalInformation?.preferredName || "",
                    birthDate: formatDate(employeeData?.personalInformation?.dateOfBirth || ""),
                    gender: employeeData?.personalInformation?.gender || "",
                    maritalStatus: employeeData?.personalInformation?.maritalStatus || "",
                    uan: employeeData?.personalInformation?.uan || "",
                    pan: employeeData?.personalInformation?.pan || "",
                },
                address: {
                    street1: employeeData?.address?.street1 || "",
                    street2: employeeData?.address?.street2 || "",
                    city: employeeData?.address?.city || "",
                    state: employeeData?.address?.state || "",
                    zipCode: employeeData?.address?.zipCode || "",
                    country: employeeData?.address?.country || "",
                },
                contactInformation: {
                    workPhone: employeeData?.contactInformation?.workPhone || "",
                    mobilePhone: employeeData?.contactInformation?.mobilePhone || "",
                    homePhone: employeeData?.contactInformation?.homePhone || "",
                    workEmail: employeeData?.contactInformation?.workEmail || "",
                    homeEmail: employeeData?.contactInformation?.homeEmail || "",
                },
                compensation: {
                    paySchedule: employeeData?.compensation?.paySchedule || "",
                    payType: employeeData?.compensation?.payType || "",
                    payRateType: employeeData?.compensation?.payRateType || "hourly",
                    payRate: employeeData?.compensation?.payRate || "",
                },
                role: employeeData?.role || "",
                jobInformation: {
                    department: employeeData?.department?._id || "",
                    jobTitle: employeeData?.position?._id || "",
                    reportsTo: employeeData?.reportsTo?._id || "",
                },
                jobDetails: {
                    hireDate: formatDate(employeeData?.hireDate || ""),
                    employmentStatus: employeeData?.status || "",
                },
                workLocation: employeeData?.workLocation || "",
            });
        }
    }, [employeeData, form]);

    const onSubmit = (values: EditEmployeeFormSchemaType) => {
        mutation.mutate(values, {
            onSuccess: () => {
                form.reset(values);
            }
        })
    };

    if (isLoading) {
        return <div className="w-full min-h-screen flex items-center justify-center">
            <Loader className="animate-spin text-muted-foreground" size={20} />
        </div>
    }

    const departmentOptions = data?.departments?.map((department: any) => ({
        value: department._id,
        label: department.name
    }));

    const profileOptions = data?.profiles?.map((profile: any) => ({
        value: profile._id,
        label: profile.name
    }));

    const employeeOptions = data?.employees?.map((employee: any) => ({
        value: employee._id,
        label: employee.name
    }))

    console.log(form.formState.isDirty);


    return (
        <div>
            <div>
                <section className="mt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <EmployeeFormSection title="Basic Information" icon="/icons/profile-circle.svg">
                                <div className="flex flex-col gap-4">
                                    <div className="flex">
                                        <EmployeeFormFieldWrapper control={form.control} name="employeeNumber" label="Employee #" />
                                    </div>
                                    <div className="flex w-full gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.firstName" label="First Name" />
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.middleName" label="Middle Name" />
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.lastName" label="Last Name" />
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.preferredName" label="Preferred Name" />

                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 max-w-2xl gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.birthDate" label="Birth Date" type="date"
                                            className="max-w-44"
                                        />
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.uan" label="UAN" />
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.pan" label="PAN" />
                                    </div>
                                    <div className="flex gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.gender" label="Gender"
                                            className="w-40"
                                            options={[
                                                {
                                                    label: "Male",
                                                    value: "male"
                                                }, {
                                                    label: "Female",
                                                    value: "female"
                                                }, {
                                                    label: "Other",
                                                    value: "other"
                                                }
                                            ]}
                                        />
                                        <EmployeeFormFieldWrapper control={form.control} name="personalInformation.maritalStatus" label="Marital Status"
                                            className="w-40"
                                            options={[
                                                {
                                                    label: "Married",
                                                    value: "married"
                                                }, {
                                                    label: "Unmarried",
                                                    value: "unmarried"
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </EmployeeFormSection>
                            <EmployeeFormSection title="Address" icon="/icons/home-2.svg">
                                <div className="flex flex-col gap-4">
                                    <EmployeeFormFieldWrapper control={form.control} name="address.street1" label="Street Address" className="max-w-80" />
                                    <EmployeeFormFieldWrapper control={form.control} name="address.street2" label="Apt/Suite" className="max-w-80" />
                                    <div className="flex gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="address.city" label="City" />
                                        <EmployeeFormFieldWrapper control={form.control} name="address.state" label="State" />
                                        <EmployeeFormFieldWrapper control={form.control} name="address.zipCode" label="Zip Code" />
                                    </div>
                                    <EmployeeFormFieldWrapper control={form.control} name="address.country" label="Country" className="max-w-72" />
                                </div>
                            </EmployeeFormSection>
                            <EmployeeFormSection title="Compensation" icon="/icons/home-2.svg">
                                <div className="flex flex-col gap-4">
                                    <EmployeeFormFieldWrapper control={form.control} name="compensation.paySchedule" label="Pay Schedule" className="max-w-60"
                                        options={[
                                            {
                                                label: "Weekly",
                                                value: "weekly"
                                            },
                                            {
                                                label: "Bi-Weekly",
                                                value: "bi_weekly"
                                            },
                                            {
                                                label: "Monthly",
                                                value: "monthly"
                                            },
                                            {
                                                label: "Semi-Monthly",
                                                value: "semi_monthly"
                                            },
                                            {
                                                label: "Quarterly",
                                                value: "quarterly"
                                            },
                                            {
                                                label: "Annually",
                                                value: "annually"
                                            },
                                            {
                                                label: "One-Time",
                                                value: "one_time"
                                            },
                                            {
                                                label: "Other",
                                                value: "other"
                                            }
                                        ]}
                                    />
                                    <EmployeeFormFieldWrapper control={form.control} name="compensation.payType" label="Pay Type"
                                        className="max-w-60"
                                        options={[
                                            {
                                                label: "Salary",
                                                value: "salary"
                                            }, {
                                                label: "Hourly",
                                                value: "hourly"
                                            }, {
                                                label: "Commission",
                                                value: "commission"
                                            }, {
                                                label: "Contract",
                                                value: "contract"
                                            }, {
                                                label: "Bonus",
                                                value: "bonus"
                                            }, {
                                                label: "Other",
                                                value: "other"
                                            }
                                        ]}
                                    />
                                    <div className="flex gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="compensation.payRate" label="Pay Rate" type="number" />
                                        <EmployeeFormFieldWrapper control={form.control} name="compensation.payRateType" label="Pay Rate Type"
                                            className="w-40"
                                            options={[
                                                {
                                                    label: "Fixed",
                                                    value: "fixed"
                                                },
                                                {
                                                    label: "Hourly",
                                                    value: "hourly"
                                                },
                                                {
                                                    label: "Daily",
                                                    value: "daily"
                                                },
                                                {
                                                    label: "Weekly",
                                                    value: "weekly"
                                                },
                                                {
                                                    label: "Monthly",
                                                    value: "monthly"
                                                },
                                                {
                                                    label: "Per Project",
                                                    value: "per_project"
                                                },
                                                {
                                                    label: "Commission-Based",
                                                    value: "commission_based"
                                                },
                                                {
                                                    label: "Piece Rate",
                                                    value: "piece_rate"
                                                },
                                                {
                                                    label: "Other",
                                                    value: "other"
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </EmployeeFormSection>

                            <EmployeeFormSection title="Contact Information" icon="/icons/call-slash.svg">
                                <div className="flex flex-col gap-4">
                                    <EmployeeFormFieldWrapper control={form.control} name="contactInformation.workPhone" label="Work Phone" className="max-w-72" />
                                    <EmployeeFormFieldWrapper control={form.control} name="contactInformation.mobilePhone" label="Mobile Phone" className="max-w-72" />
                                    <EmployeeFormFieldWrapper control={form.control} name="contactInformation.homePhone" label="Home Phone" className="max-w-72" />
                                    <EmployeeFormFieldWrapper control={form.control} name="contactInformation.workEmail" label="Work Email" className="max-w-72" />
                                    <EmployeeFormFieldWrapper control={form.control} name="contactInformation.homeEmail" label="Home Email" className="max-w-72" />
                                </div>
                            </EmployeeFormSection>

                            {/* Job Details */}
                            <EmployeeFormSection title="Job Details" icon="/icons/call-slash.svg">
                                <div className="flex gap-4">
                                    <EmployeeFormFieldWrapper control={form.control} name="jobDetails.hireDate" label="Hire Date" type="date" />
                                    <EmployeeFormFieldWrapper control={form.control} name="jobDetails.employmentStatus" label=" Status"
                                        className="w-40"
                                        options={[
                                            {
                                                label: "Active", value: "active",
                                            }, {
                                                label: "Inactive", value: "inactive",
                                            },
                                            {
                                                label: "On-Leave", value: "on-leave",
                                            },
                                            {
                                                label: "Terminated", value: "terminated",
                                            }
                                        ]}
                                    />
                                </div>
                            </EmployeeFormSection>

                            {/* Job Information */}
                            <EmployeeFormSection title="Job Information" icon="/icons/call-slash.svg">
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="jobInformation.jobTitle" label="Job Title" className="w-64"
                                            options={profileOptions}
                                        />
                                        <EmployeeFormFieldWrapper control={form.control} name="jobInformation.reportsTo" label="Reports To" className="w-64"
                                            useCombobox
                                            options={employeeOptions}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="jobInformation.department" label="Department" className="w-64"
                                            options={departmentOptions}
                                        />
                                        <EmployeeFormFieldWrapper control={form.control} name="role" label="Role" className="w-64"
                                            options={
                                                [
                                                    { label: "Employee", value: "employee" },
                                                    { label: "Manager", value: "manager" },
                                                    { label: "Lead", value: "lead" },
                                                    { label: "Admin", value: "admin" },
                                                ]
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <EmployeeFormFieldWrapper control={form.control} name="workLocation" label="Location" className="w-64"
                                            options={
                                                [
                                                    { label: "Pune, India", value: "pune, india" },
                                                    { label: "Patna, India", value: "patna, india" },
                                                ]
                                            }
                                        />
                                        <EmployeeFormFieldWrapper control={form.control} name="password" label="Password" className="w-64" />

                                    </div>
                                </div>
                            </EmployeeFormSection>

                            {/* Submit Button */}
                            <div className="mt-8 flex gap-4">
                                <Button
                                    variant="saveAction"
                                    className="h-9"
                                    disabled={
                                        mutation.isPending || !form.formState.isDirty
                                    }
                                >Update</Button>
                                <Button
                                    variant="outline"
                                    className="h-9"
                                    onClick={() => {
                                        navigate("/employees")
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </section>
            </div>
        </div>
    );
};
