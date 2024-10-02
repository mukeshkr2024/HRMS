import { cn } from "@/utils/cn";
import { Mails, MessagesSquare } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

export const InboxLayout = () => {
    const routes = [
        {
            label: "Feedbacks",
            route: "/inbox",
            icon: <MessagesSquare />
        }
    ];

    const { pathname } = useLocation();

    return (
        <div className="w-full flex flex-col relative h-screen">
            {/* Header */}
            <header className="flex items-center gap-4 sticky top-0 bg-white z-10 p-4">
                <div className="flex gap-2.5">
                    <Mails className="h-7 w-7" />
                    <span className="text-[#333333] font-semibold text-lg">Inbox</span>
                </div>
            </header>

            <div className="flex gap-8 w-full h-full">
                {/* Sidebar */}
                <nav className="bg-[#F7F8FA] rounded-md w-[280px] h-auto hidden lg:block">
                    <div className="p-6 flex flex-col gap-y-4">
                        {routes.map((item) => (
                            <div
                                key={item.route}
                                className={cn(
                                    "flex items-center gap-4 cursor-pointer text-[#313131]",
                                    item.route === pathname &&
                                    "text-brand-green px-5 py-2 rounded-full bg-[#FFFFFF]"
                                )}
                            >
                                {item.icon}
                                <h4 className="font-normal text-base">{item.label}</h4>
                            </div>
                        ))}
                    </div>
                </nav>

                <main className="flex-grow overflow-y-auto custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
