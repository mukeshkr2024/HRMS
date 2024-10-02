import { UserAvatar } from "@/components/shared/user-avatar";
import { timeAgo } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useGetFeedbackNotifications } from "../api/use-get-feedback-notifications";

interface Notification {
    id: string;
    message: string;
    isRead: boolean;
    redirectUrl: string;
    createdAt: string;
    createdBy: {
        name: string;
        avatar: string;
    };
}


export const FeedbackList = () => {
    const { data } = useGetFeedbackNotifications();

    console.log(data);

    const navigate = useNavigate();

    if (!data || data?.notifications?.length === 0) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4 text-[#242424]">Feedback</h2>
                <p className="text-muted-foreground">No notifications available.</p>
            </div>
        )
    }

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-[#242424]">Feedback</h2>
                <div>
                    {data?.notifications?.map((notification: Notification) => (
                        <div
                            key={notification.id}
                            className={`flex gap-4 w-full px-1.5 border-b py-1.5 mb-4 items-center cursor-pointer ${notification.isRead ? 'bg-gray-100 rounded-md' : 'bg-white'
                                }`}
                            onClick={() => navigate(`/inbox${notification?.redirectUrl}`)}
                        >
                            <UserAvatar
                                className="w-12 h-12"
                                avatar={notification.createdBy.avatar}
                                name={notification.createdBy.name}
                            />
                            <div className="flex flex-col w-full">
                                <h4 className="font-semibold text-[#242424]">
                                    {notification.createdBy.name}
                                    <span className="text-xs ml-4 text-muted-foreground">
                                        {timeAgo(notification.createdAt)}
                                    </span>
                                </h4>
                                <p className="text-muted-foreground">{notification.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
