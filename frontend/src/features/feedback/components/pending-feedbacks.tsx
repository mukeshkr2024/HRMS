import { UserAvatar } from "@/components/shared/user-avatar";
import { formatDate } from "@/utils";
import { X } from "lucide-react";
import { useWithdrawFeedback } from "../api/use-withdraw-feedback";
import { ConfirmDialog } from "@/components/confirm-dialog";
import React from "react";



interface Props {
    data: {
        pages: {
            pendings: {
                _id: string;
                feedbackGiver: {
                    name: string;
                    avatar: string;
                    jobTitle: string;
                };
                dueDate: Date;
                createdAt: Date;
            }[]
        }[]
    },
}

export const PendingFeedbacks = ({ data }: Props) => {

    const mutation = useWithdrawFeedback();

    const onWithDraw = (id: string) => {
        console.log(id);

        mutation.mutate(id)
    }

    if (!data?.pages?.length || data?.pages[0]?.pendings?.length) return;


    return (
        <section className="bg-[#f4f8f6] border-t border-gray-300 font-urbanist py-6 px-8 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg text-slate-700 mb-4">Waiting feedback from</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    data?.pages?.map(item => (
                        <React.Fragment>
                            {item?.pendings?.map((item) => (
                                <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                                    <div className="flex items-center gap-4">
                                        <UserAvatar
                                            name={item.feedbackGiver.name || ""}
                                            avatar={item.feedbackGiver.avatar || ""}
                                            className="w-12 h-12"
                                        />
                                        <div className="flex flex-col">
                                            <h4 className="font-semibold text-gray-800">{item.feedbackGiver.name}</h4>
                                            <p className="text-sm text-gray-500">{item.feedbackGiver.jobTitle}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-red-500 font-medium">Due Date: {formatDate(item.dueDate)}</p>
                                            <p className="text-sm text-gray-400">Sent on: {formatDate(item?.createdAt)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="border-r h-full border-gray-300" />
                                            <ConfirmDialog
                                                onConfirm={() => {
                                                    onWithDraw(item._id)
                                                }}
                                            >
                                                <X
                                                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-200"
                                                    size={20}
                                                />
                                            </ConfirmDialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))
                }
            </div>
        </section>
    );
};
