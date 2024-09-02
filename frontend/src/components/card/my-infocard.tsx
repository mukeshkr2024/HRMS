import { Button } from "../ui/button"
import { Card } from "../ui/card"

export const MyInfoCard = () => {
    return (
        <Card className="flex flex-wrap justify-between items-center px-14 py-8 font-urbanist shadow-md">
            <div className="flex gap-x-10">
                <div>
                    <img src="/my-info.svg" alt="my-info" />
                </div>
                <div className="flex flex-col gap-y-4">
                    <h3 className="font-semibold text-3xl text-[#000000]">Jane Joyey.</h3>
                    <div className="flex gap-x-8 font-urbanist text-[#5C5C5C] font-medium">
                        <div className="flex gap-x-14">
                            <div className="flex gap-y-0.5 flex-col">
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/briefcase.svg" alt="" className="size-[16px]" />
                                    <p>Full-Time</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/people.svg" alt="" className="size-[16px]" />
                                    <p>Marketing</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/location.svg" alt="" />
                                    <p>Pune</p>
                                </div>
                            </div>
                            <div className="flex gap-y-0.5 flex-col">
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/sms-notification.svg" alt="" />
                                    <p>jane.joyey@cloudprism.in</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/call-slash.svg" alt="" />
                                    <p>xx xxxx xxxx xx</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="bg-[#E6E6E6] h-full w-[1.5px] rounded-md" />
                            <div className="flex flex-col gap-y-2.5 ml-4">
                                <p className="text-[#1E1E1E]">Reports to</p>
                                <div className="flex items-center gap-x-3">
                                    <img src="/my-info.svg" alt="" className="size-[23px]" />
                                    <p className="font-normal text-xs">Daisy Jane</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button variant="outline" className="shadow-md">Request change</Button>
            </div>

        </Card>
    )
}
