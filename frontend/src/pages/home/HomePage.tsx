import { Announcements } from "@/components/dashboard/announcements";
import { Profile } from "@/components/dashboard/profile";
import { Tasks } from "@/components/dashboard/tasks";

export const HomePage = () => {
  return (
    <div className="">
      <h2 className="text-black font-semibold text-xl">Hello there!</h2>
      <div className="mt-4 flex gap-x-5">
        <Announcements />
        <div className="w-[360px] flex flex-col gap-y-4">
          <Profile />
          <Tasks />
        </div>
      </div>
    </div>
  );
};
