import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomInput } from '../shared/custom-input'
import { Card } from '../ui/card'

const formSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    graduationYear: z.string(),
    major: z.string(),
    gpa: z.number(),
    startDate: z.string(),
    endDate: z.string(),
})

type FormSchemaType = z.infer<typeof formSchema>;


export const EducationCard = () => {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    })

    const onSubmit = () => {

    }
    return (
        <Card className='flex-1 bg-[#F7F8FA] shadow-md p-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 ">
                    <FormField
                        control={form.control}
                        name="institution"
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                    College/Institution
                                </FormLabel>
                                <FormControl>
                                    <CustomInput {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="degree"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                    Degree
                                </FormLabel>
                                <FormControl>
                                    <CustomInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="major"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                    Major/Specilization
                                </FormLabel>
                                <FormControl>
                                    <CustomInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gpa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                    Gpa
                                </FormLabel>
                                <FormControl>
                                    <CustomInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                    Start date
                                </FormLabel>
                                <FormControl>
                                    <CustomInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                    End date
                                </FormLabel>
                                <FormControl>
                                    <CustomInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </form>
            </Form>
        </Card>
    )
}
