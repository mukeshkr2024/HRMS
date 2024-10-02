import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMemberFeedback } from '../api/use-get-feeback';
import { useSubmitFeedback } from '../api/use-submit-feedback';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/shared/user-avatar';
import { CustomLoader } from '@/components/shared/custom-loader';
import { formatDate } from '@/utils';

export const SubmitFeedBack = () => {
    const [feedbackPositive, setFeedbackPositive] = useState('');
    const [feedbackImprovement, setFeedbackImprovement] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();
    const { feedbackId } = useParams();



    const { data, isLoading: isFeedbackLoading } = useGetMemberFeedback(feedbackId!);
    const submitMutation = useSubmitFeedback(feedbackId!);

    console.log(data);


    const { name, avatar, jobTitle } = data?.feedbackReceiver || {};

    useEffect(() => {
        console.log("callled");
        if (data?.question1Response) {
            setFeedbackPositive(data.question1Response)
        }
        if (data?.question2Response) {
            setFeedbackImprovement(data.question2Response)
        }
    }, [data])


    const handleSubmit = async () => {
        if (!feedbackPositive || !feedbackImprovement) {
            toast({ title: 'Please fill out both feedback fields' });
            return;
        }

        submitMutation.mutate(
            {
                response1: feedbackPositive,
                response2: feedbackImprovement
            },
            {
                onSuccess: () => {
                    navigate("/inbox");
                },
            }
        );
    };

    if (isFeedbackLoading) return (
        <CustomLoader />
    );

    const isSubmitted = data?.submitted

    return (
        <div className="">
            <div className="flex items-center cursor-pointer mb-4" onClick={() => navigate("/inbox")}>
                <ArrowLeft />
                <h4 className="ml-2 text-blue-500 hover:underline">Back to Inbox</h4>
            </div>

            <Card className="max-w-2xl mx-auto mt-4">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Provide Feedback for {name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div>
                        <p className="text-gray-700">
                            Help {name} improve by sharing constructive feedback. Your responses will remain anonymous.
                        </p>
                        <p className="text-red-500 text-sm mt-1">
                            Feedback is due by <strong>{formatDate(data?.dueDate)}</strong>.
                        </p>
                    </div>
                    <Separator />

                    <div className="flex items-center">
                        <UserAvatar name={name} avatar={avatar} />
                        <div className="ml-4">
                            <h4 className="font-semibold">{name}</h4>
                            <p className="text-gray-500">{jobTitle}</p>
                        </div>
                    </div>

                    <div>
                        <p className='pb-2 font-semibold text-muted-foreground'>{name} will not see this feedback.</p>
                        <Label htmlFor="positive-feedback" className="text-sm font-medium">
                            What does {name} do well?
                        </Label>
                        <Textarea
                            id="positive-feedback"
                            placeholder="Share your positive feedback here"
                            className="mt-1 custom-scrollbar"
                            rows={4}
                            value={feedbackPositive}
                            onChange={(e) => setFeedbackPositive(e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>

                    <div>
                        <Label htmlFor="improvement-feedback" className="text-sm font-medium">
                            How can {name} improve?
                        </Label>
                        <Textarea
                            id="improvement-feedback"
                            placeholder="Provide constructive feedback"
                            className="mt-1 custom-scrollbar"
                            rows={4}
                            value={feedbackImprovement}
                            onChange={(e) => setFeedbackImprovement(e.target.value)}
                            disabled={isSubmitted}
                        />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={submitMutation.isPending || !feedbackPositive || !feedbackImprovement || isSubmitted}
                    >
                        {isSubmitted ? "Submitted" : submitMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Feedback'
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
