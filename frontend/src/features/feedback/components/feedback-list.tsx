import { UserAvatar } from "@/components/shared/user-avatar";
import { formatDate } from "@/utils";
import React from "react";

interface FeedbackGiver {
    _id: string;
    name: string;
    avatar: string;
    jobTitle: string;
}

interface Feedback {
    _id: string;
    feedbackGiver: FeedbackGiver;
    question1Response: string;
    question2Response: string;
    createdAt: Date;
}

interface FeedbackPage {
    feedbacks: Feedback[];
}

interface Props {
    data: {
        pages: FeedbackPage[];
    };
}

export const FeedBackList: React.FC<Props> = React.memo(({ data }) => {

    if (!data?.pages.length || !data.pages[0]?.feedbacks?.length) {
        return (
            <div className="h-40 flex items-center justify-center">
                <p className="text-muted-foreground text-center">No feedback history found</p>
            </div>
        );
    }

    return (
        <section className="px-6 py-8 font-urbanist bg-gray-50 rounded-lg shadow-md">
            <div className="flex flex-col gap-y-6">
                {data.pages.map((item, pageIndex) => (
                    <React.Fragment key={pageIndex}> {/* Added key for the fragment */}
                        {item.feedbacks.map(({ _id, feedbackGiver, question1Response, question2Response, createdAt }) => (
                            <div
                                key={_id}
                                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                            >
                                <div className="flex gap-4 items-center">
                                    <UserAvatar
                                        avatar={feedbackGiver.avatar}
                                        name={feedbackGiver.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-lg text-gray-800">{feedbackGiver.name}</p>
                                        <p className="text-sm text-gray-500">{feedbackGiver.jobTitle}</p>
                                    </div>
                                    <span className="text-sm text-gray-400">{formatDate(createdAt)}</span>
                                </div>

                                <div className="mt-6 space-y-6">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">What are some things Charlotte does well?</h3>
                                        <p className="mt-1 text-gray-700 text-sm">{question1Response}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">How could Charlotte improve?</h3>
                                        <p className="mt-1 text-gray-700 text-sm">{question2Response}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
});
