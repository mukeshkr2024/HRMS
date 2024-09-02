import { CirclePlus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { AddNewAnnouncementPopup } from "./add-newAnnouncement";
import { useGetAnnouncements } from "@/api/announcement/useGetAnnouncemts";
import { useAuthStore } from "@/context/useAuthStore";
import { useDeleteAnnouncement } from "@/api/announcement/useDeleteAnnouncement";


export const Announcements = () => {

    const { data, } = useGetAnnouncements();
    const { employee } = useAuthStore()

    const handleDeleteMutation = useDeleteAnnouncement()

    console.log(data);


    console.log(employee);

    const handleDelete = (id: string) => {
        handleDeleteMutation.mutate(id);
    }


    const profilePic = "https://media.istockphoto.com/id/1365997131/photo/portrait-of-mid-20s-african-american-man-outdoors-at-dusk.webp?b=1&s=170667a&w=0&k=20&c=_XMq-GZm_VV-N_kS8KCHp1nNjhdKkaLz0JgRdl3OlAk="

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
                            <img src={profilePic} alt={announcement.author} height={40} width={40} className="size-[40px] rounded-full object-cover" />
                            <div>
                                <div className="flex justify-between">
                                    <span className="text-[#242424] font-semibold">{announcement.author || "Daisy"}</span>
                                    {employee?._id === announcement?.createdBy && <div>
                                        <Trash className="size-3 text-red-400 cursor-pointer" onClick={() => { handleDelete(announcement?._id) }} />
                                    </div>}
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


