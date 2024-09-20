import { UploadAvatar } from "../my-info/upload-avatar";
import { UserAvatar } from "../shared/user-avatar";
import { Card } from "../ui/card";

export const MyInfoCard = ({ employee }: {
    employeeId?: string,
    employee: {
        avatar: string,
        personalInformation: {
            firstName: string,
            middleName: string,
            lastName: string
        }
        contactInformation: {
            workPhone: string
        }
        email: string
        reportsTo: {
            name: string
            avatar: string
        },
        department: {
            name: string
        },
        workLocation: string
    }
}) => {
    return (
        <Card className="flex flex-wrap lg:justify-between lg:items-center px-4 py-6 lg:px-14 lg:py-8 font-urbanist shadow-md relative">
            <div className="items-center absolute right-10 justify-center lg:hidden ">
                <UploadAvatar
                    name="cn"
                    avatar={employee?.avatar!}
                />
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-x-10 gap-y-6">
                <div className="lg:flex items-center hidden justify-center">
                    <UploadAvatar
                        name="cn"
                        avatar={employee?.avatar!}
                    />
                </div>
                <div className="flex flex-col gap-y-4">
                    <h3 className="font-semibold sm:text-xl lg:text-3xl text-[#000000]">
                        {employee?.personalInformation?.firstName} {employee?.personalInformation?.middleName} {employee?.personalInformation?.lastName}
                    </h3>
                    <div className="flex flex-col lg:flex-row lg:gap-x-8 font-urbanist text-[#5C5C5C] font-medium gap-y-6">
                        <div className="flex gap-x-6 lg:gap-x-14 gap-y-4 lg:gap-y-0 flex-col lg:flex-row">
                            <div className="flex gap-y-1 flex-col">
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/briefcase.svg" alt="" className="h-4 w-4" />
                                    <p>Full-Time</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/people.svg" alt="" className="h-4 w-4" />
                                    <p>{employee?.department?.name}</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/location.svg" alt="" className="h-4 w-4" />
                                    <p className="capitalize">{employee?.workLocation}</p>
                                </div>
                            </div>
                            <div className="flex gap-y-1 flex-col">
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/sms-notification.svg" alt="" className="h-4 w-4" />
                                    <p className="capitalize">{employee?.email}</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/call-slash.svg" alt="" className="h-4 w-4" />
                                    <p>{employee?.contactInformation?.workPhone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="bg-[#E6E6E6] h-full w-[1.5px] rounded-md hidden lg:block" />
                            <div className="flex flex-col gap-y-2.5 ml-0 lg:ml-4">
                                <p className="text-[#1E1E1E] text-sm lg:text-base">Reports to</p>
                                <div className="flex items-center gap-2">
                                    <UserAvatar
                                        avatar={employee.reportsTo.avatar}
                                        name={employee.reportsTo.name}
                                        className="h-6 w-6 lg:h-6 lg:w-6"
                                    />
                                    <span className="text-sm lg:text-base font-semibold">{employee.reportsTo.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {!employeeId && (
                <div className="mt-4 lg:mt-0">
                    <Button variant="outline" className="shadow-md">
                        Request change
                    </Button>
                </div>
            )} */}
        </Card>
    );
};
