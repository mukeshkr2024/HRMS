import { Announcements } from "@/components/dashboard/announcements";
// import { Celebrations } from "@/components/dashboard/celebrations";
import { Profile } from "@/components/dashboard/profile";
import { Tasks } from "@/components/dashboard/tasks";

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-black font-semibold text-xl">Hello there!</h2>
      <div className="mt-4 flex gap-x-5 flex-col lg:flex-row gap-y-4">
        <div className="flex-1">
          <Announcements />
          {/* TODO : add later */}
          {/* <Celebrations /> */}
        </div>
        <div className="lg:w-[360px] flex flex-col gap-y-4">
          <Profile />
          <Tasks />
        </div>
      </div>
    </div>
  );
};
