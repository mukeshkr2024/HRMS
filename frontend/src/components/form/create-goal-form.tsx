import { useCreateGoal } from "@/features/goals/api/use-create-goals"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { cn } from "@/utils/cn"
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from "date-fns"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomInput } from '../shared/custom-input'
import { CustomTextArea } from "../shared/custom-text-area"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const formSchema = z.object({
    title: z.string({ message: "Please enter goal objective" }),
    description: z.string({ message: "Please enter goal description" }),
    dueDate: z.date({ message: "Please select due date" }),
})

export type GoalFormSchemaType = z.infer<typeof formSchema>;

interface CreateGoalFormProps {
    setIsCreating: (value: boolean) => void
}

export const CreateGoalForm = ({ setIsCreating }: CreateGoalFormProps) => {
    const {
        mutate,
        isPending,
    } = useCreateGoal()

    const form = useForm<GoalFormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    })

    const onSubmit = (values: GoalFormSchemaType) => {
        mutate(values,
            {
                onSuccess: () => {
                    form.reset()
                    setIsCreating(false)
                }
            }
        )

    }
    return (
        <div className='mt-4'>
            <div className='bg-[#F5F5F5] h-16 flex items-center justify-center rounded-md'>
                <h2 className="text-[#333333] font-semibold text-lg">Create New Goal</h2>
            </div>
            <div className="max-w-3xl mx-auto  mt-12">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <div className="flex items-center justify-between gap-6 ">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem
                                        className="flex-1"
                                    >
                                        <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                            Goal Objective*
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
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                            Due Date*
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3  text-left font-normal",
                                                            !field.value && "text-muted-foreground "
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-urbanist text-[#5C5C5C] font-medium">
                                        Description*
                                    </FormLabel>
                                    <FormControl>
                                        <CustomTextArea {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end gap-4">
                            <Button variant="outline" className="h-9"
                                onClick={() => {
                                    setIsCreating(false)
                                    form.reset()
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={isPending}
                                className="h-9 flex items-center gap-2  bg-[#1FBE8E] hover:bg-[#1FBE8E] text-black font-semibold text-sm" type="submit"><PlusCircle size={15} />Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}