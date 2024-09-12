import { CirclePlus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { AddNewAnnouncementPopup } from "./add-newAnnouncement";
import { useGetAnnouncements } from "@/api/announcement/useGetAnnouncemts";
import { useAuthStore } from "@/context/useAuthStore";
import { useDeleteAnnouncement } from "@/api/announcement/useDeleteAnnouncement";
import { UserAvatar } from "../shared/user-avatar";
import { ConfirmDialog } from "../confirm-dialog";


export const Announcements = () => {

    const { data, } = useGetAnnouncements();
    const { employee } = useAuthStore()

    const handleDeleteMutation = useDeleteAnnouncement()

    console.log(data);


    console.log(employee);

    const handleDelete = (id: string) => {
        handleDeleteMutation.mutate(id);
    }



    return (
        <section className="flex-1">
            <Card style={{ height: '400px', overflowY: 'auto' }}>
                <div className="sticky top-0 z-10 bg-[#EBEBEB] px-6 py-1.5 flex justify-between items-center">
                    <h3 className="text-lg font-medium">What’s happening at CloudPrism</h3>
                    <AddNewAnnouncementPopup>
                        <Button
                            className=" font-normal flex items-center justify-center gap-x-2 text-[#313131] h-9  shadow-sm"
                            variant="outline"
                        >
                            <CirclePlus size={18} /> Add new announcements
                        </Button>
                    </AddNewAnnouncementPopup>

                </div>

                <div className="px-10 py-8 flex flex-col gap-y-5">
                    {data?.announcements.map((announcement: any) => (
                        <div key={announcement?._id} className="flex items-center gap-x-4">
                            <UserAvatar
                                className="size-[40px]"
                                avatar={announcement?.createdBy?.avatar}
                                name={announcement?.createdBy?.name}
                            />
                            <div className="w-full">
                                <div className="flex justify-between w-full">
                                    <span className="text-[#242424] font-semibold">{announcement?.createdBy?.name}</span>
                                    {employee?._id === announcement?.createdBy?._id && <ConfirmDialog
                                        onConfirm={() => { handleDelete(announcement?._id) }}
                                    >
                                        <Trash className="size-3 text-red-400 cursor-pointer" />
                                    </ConfirmDialog>}
                                </div>
                                <p className="text-[#616161] font-normal text-sm">{announcement.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
};


