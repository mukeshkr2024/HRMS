import { Announcements } from "@/features/home/components/announcements";
import { Profile } from "./components/profile";
import { Tasks } from "./components/tasks";
import { useAuthStore } from "@/context/useAuthStore";

export const HomePage = () => {
    const { employee } = useAuthStore()
    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-black">Hello {employee?.name.split(" ")[0]}</h2>
            <div className="mt-4 flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Announcements />
                    {/* TODO : add later */}
                    {/* <Celebrations /> */}
                </div>
                <div className="lg:w-[360px] flex flex-col gap-4">
                    <Profile />
                    <Tasks />
                </div>
            </div>
        </div>
    );
};
