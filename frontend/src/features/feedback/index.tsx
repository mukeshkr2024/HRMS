import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMemberFeedbacks } from "./api/use-get-member-feedbacks";
import { useRequestFeedback } from "./api/use-request-feedback";
import { ComboBox } from "./components/combo-box";
import { PendingFeedbacks } from "./components/pending-feedbacks";
import { FeedBackList } from "./components/feedback-list";
import { CustomLoader } from "@/components/shared/custom-loader";
import { useGetMyTeamMembers } from "./api/use-get-my-members";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./components/DatePickerWithRange";

export const FeedbackPage = () => {
    const { memberId } = useParams();
    const [selectedGiver, setSelectedGiver] = useState<string>("");
    const today = new Date();
    const oneMonthAgo = subDays(today, 180);

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: oneMonthAgo,
        to: today,
    });

    const { data: members, isLoading: membersLoading, error: membersError } = useGetMyTeamMembers();
    const {
        data: feedbackData,
        isLoading: feedbackLoading,
        error: feedbackError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetMemberFeedbacks(memberId!, date);

    const requestMutation = useRequestFeedback();

    const onRequest = () => {
        if (!selectedGiver || !memberId) return;
        requestMutation.mutate({
            giverId: selectedGiver,
            receiverId: memberId,
        });
    };

    if (membersLoading || feedbackLoading) {
        return <CustomLoader />;
    }

    if (membersError || feedbackError) {
        return <p className="text-red-500">Error loading data. Please try again later.</p>;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <MessagesSquare />
                <h2 className="text-black font-semibold text-2xl">Request Feedback</h2>
            </div>

            {/* ComboBox and Send Request Button */}
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <p className="text-sm text-muted-foreground">Select a member to request feedback from:</p>
                    <div className="flex items-center gap-2.5 mt-2">
                        <ComboBox
                            data={members || []}
                            value={selectedGiver}
                            setValue={setSelectedGiver}
                        />
                        <Button
                            onClick={onRequest}
                            variant="saveAction"
                            className="h-9"
                            disabled={!selectedGiver || requestMutation.isPending}
                        >
                            {requestMutation.isPending ? "Sending..." : "Send Request"}
                        </Button>
                    </div>
                </div>
                <div className="flex mr-4">
                    <DatePickerWithRange
                        date={date}
                        setDate={setDate}
                        className="h-9"
                    />
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-y-5">
                <PendingFeedbacks
                    // @ts-ignore
                    data={feedbackData || []}
                />
                <FeedBackList
                    // @ts-ignore
                    data={feedbackData || { pages: [] }}
                />
            </div>

            {hasNextPage && (
                <div className="mt-4 flex items-center justify-center">
                    <Button
                        onClick={() => fetchNextPage()}
                        variant="outline"
                        className=""
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </div>
    );
};
