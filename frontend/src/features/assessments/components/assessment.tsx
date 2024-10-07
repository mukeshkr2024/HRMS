import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Blinds, Lock } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { SelectField } from "./SelectField";
import { formatDateToLocalString } from "@/utils";
import { Separator } from "@/components/ui/separator";

interface Props {
    type: "self" | "manager";
    data: {
        selfAssessment?: {
            isCompleted: boolean;
            answer1?: string;
            answer2?: string;
            answer3?: string;
            answer4?: string;
        };
        managerAssessment?: {
            isCompleted: boolean;
            answer1?: string;
            answer2?: string;
            answer3?: string;
            answer4?: string;
        };
    };
    onSubmit: SubmitHandler<FormData>;
    isVisible: boolean;
    hideField: boolean;
    name?: string; // Name of the employee being assessed, for manager's view
}

type FormData = {
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
};

const formSchema = z.object({
    answer1: z.string().nonempty("This field is required"),
    answer2: z.string().nonempty("This field is required"),
    answer3: z.string().nonempty("This field is required"),
    answer4: z.string().nonempty("This field is required"),
});

export const Assessment = ({ type, data, onSubmit, isVisible, hideField, name }: Props) => {
    const initialData = type === "self" ? data?.selfAssessment : data?.managerAssessment;
    console.log(hideField);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => ({
            answer1: initialData?.answer1 || "",
            answer2: initialData?.answer2 || "",
            answer3: initialData?.answer3 || "",
            answer4: initialData?.answer4 || "",
        }), [initialData]),
    });

    useEffect(() => {
        form.reset(initialData);
    }, [initialData, form]);

    const getQuestionText = (baseText: string, forManager: boolean) =>
        forManager && name ? `${baseText} about ${name}` : baseText;

    return (
        <Card className="flex-1 relative overflow-hidden font-urbanist">
            <CardHeader>
                <CardTitle className="flex items-center text-[#333333] text-xl">
                    <Blinds className="mr-2" size={22} /> {type === "manager" ? "Manager" : "Self"} Assessment
                </CardTitle>
                {/* @ts-ignore */}
                {initialData?.isCompleted && initialData?.updatedAt && <p className="text-muted-foreground">Completed: {formatDateToLocalString(initialData?.updatedAt)}</p>}
                <Separator />
            </CardHeader>

            <CardContent className="relative">
                {initialData?.isCompleted ? (
                    <div className="space-y-6">
                        {!hideField && (
                            <>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-700">
                                        {getQuestionText("How well do you think your contributions are recognized?", type === "manager")}
                                    </h4>
                                    <p className="text-muted-foreground">{initialData?.answer1}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg text-slate-700 font-semibold">
                                        {getQuestionText("What could significantly improve your ability to excel at work?", type === "manager")}
                                    </h4>
                                    <p className="text-muted-foreground">{initialData?.answer2}</p>
                                </div>
                                <Separator />
                            </>
                        )}
                        <div>
                            <h4 className="text-lg font-semibold text-slate-700">
                                {getQuestionText("What do you believe are your key strengths at work?", type === "manager")}
                            </h4>
                            <p className="text-muted-foreground break-words">{initialData?.answer3}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-slate-700">
                                {getQuestionText("What areas could you improve in, and how do you plan to do so?", type === "manager")}
                            </h4>
                            <p className="text-muted-foreground break-words">{initialData?.answer4}</p>
                        </div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                            {!hideField && <>
                                <SelectField
                                    name="answer1"
                                    label={getQuestionText("How well do you think your contributions are recognized?", type === "manager")}
                                    options={[
                                        { value: "Highly Recognized", label: "Highly Recognized" },
                                        { value: "Moderately Recognized", label: "Moderately Recognized" },
                                        { value: "Poorly Recognized", label: "Poorly Recognized" },
                                    ]}
                                    control={form.control}
                                />
                                <SelectField
                                    name="answer2"
                                    label={getQuestionText("What could significantly improve your ability to excel at work?", type === "manager")}
                                    options={[
                                        { value: "betterTools", label: "Better Tools" },
                                        { value: "moreTraining", label: "More Training" },
                                        { value: "greaterAutonomy", label: "Greater Autonomy" },
                                    ]}
                                    control={form.control}
                                />
                            </>}
                            <FormField
                                control={form.control}
                                name="answer3"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{getQuestionText("What do you believe are your key strengths at work?", type === "manager")}</FormLabel>
                                        <Textarea
                                            disabled={hideField}
                                            {...field} placeholder="List strengths (e.g., communication, problem-solving)" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="answer4"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{getQuestionText("What areas could you improve in, and how do you plan to do so?", type === "manager")}</FormLabel>
                                        <Textarea
                                            disabled={hideField}
                                            {...field} placeholder="Describe how you plan to improve" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {!hideField && <Button type="submit" variant="saveAction" className="w-40">
                                Submit
                            </Button>}
                        </form>
                    </Form>
                )}
            </CardContent>
            {!isVisible && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-95">
                    <Lock size={48} className="text-gray-500" />
                    <p className="text-gray-500 mt-2">Complete your assessment to unlock this section.</p>
                </div>
            )}
        </Card>
    );
};
