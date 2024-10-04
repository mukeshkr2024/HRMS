import { ConfirmDialog } from "@/components/confirm-dialog";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CirclePlus, Trash } from "lucide-react";
import { useGetAnnouncements } from "../api/announcement/use-get-announcement";
import { useAuthStore } from "@/context/useAuthStore";
import { useDeleteAnnouncement } from "../api/announcement/use-delete-announcement";
import { AddNewAnnouncementPopup } from "./add-new-announcement";
import { timeAgo } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

interface Announcement {
    _id: string;
    description: string;
    createdBy: {
        _id: string;
        name: string;
        avatar: string;
    };
}

export const Announcements = () => {
    const { data, isLoading } = useGetAnnouncements();
    const { employee } = useAuthStore();
    const handleDeleteMutation = useDeleteAnnouncement();

    const handleDelete = (id: string) => {
        // Confirmation before deletion can be handled inside ConfirmDialog
        handleDeleteMutation.mutate(id);
    };

    return (
        <section className="w-full max-w-3xl ">
            <Card className="h-[400px] overflow-y-auto custom-scrollbar">
                <header className="sticky top-0 z-10 bg-[#EBEBEB] px-6 py-1.5 flex justify-between items-center">
                    <h3 className="text-lg font-medium">What’s Happening at CloudPrism</h3>
                    {employee?.role === "admin" && (
                        <AddNewAnnouncementPopup>
                            <Button
                                className="flex items-center gap-2 text-[#313131] h-9 shadow-sm"
                                variant="outline"
                            >
                                <CirclePlus size={18} /> Add New Announcement
                            </Button>
                        </AddNewAnnouncementPopup>
                    )}
                </header>

                {isLoading ? (
                    <div className="px-10 py-8 flex flex-col gap-5 w-full">
                        {Array.from({
                            length: 4
                        }).map((_, index) => (
                            <div className="flex gap-4 w-full border-b pb-4 items-center" key={index}>
                                <Skeleton className="size-10 rounded-full" />
                                <div className="w-full flex flex-col gap-y-1.5">
                                    <Skeleton className="w-full h-2.5" />
                                    <Skeleton className="w-full h-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-10 py-8 flex flex-col gap-5">
                        {data?.notifications?.map((notification: any) => (
                            <div key={notification.id} className="flex gap-4 w-full border-b pb-4">
                                <UserAvatar
                                    className="w-10 h-10"
                                    avatar={notification.createdBy.avatar}
                                    name={notification.createdBy.name}
                                />
                                <div className="flex flex-col w-full">
                                    <h4 className="font-semibold text-[#242424]">
                                        {notification.createdBy.name}
                                        <span className="text-xs ml-4 text-muted-foreground">{timeAgo(notification.createdAt)}</span>
                                    </h4>
                                    <p className="text-muted-foreground">{notification.message}</p>
                                </div>
                                <Link to={`/inbox${notification?.redirectUrl}?notification_id=${notification?._id}`}>
                                    <Button variant="outline" className="mt-2 h-9">Give Feedback</Button>
                                </Link>
                            </div>
                        ))}
                        {data?.announcements.map((announcement: Announcement) => (
                            <div key={announcement._id} className="flex items-center gap-4 border-b pb-4">
                                <UserAvatar
                                    className="w-10 h-10"
                                    avatar={announcement.createdBy.avatar}
                                    name={announcement.createdBy.name}
                                />
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-[#242424]">
                                            {announcement.createdBy.name}
                                        </span>
                                        {employee?._id === announcement.createdBy._id && (
                                            <ConfirmDialog onConfirm={() => handleDelete(announcement._id)}>
                                                <Trash className="w-4 h-4 text-red-500 cursor-pointer" />
                                            </ConfirmDialog>
                                        )}
                                    </div>
                                    <p className="text-sm font-normal text-[#616161] break-words max-w-xl">
                                        {announcement.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </section>
    );
};
