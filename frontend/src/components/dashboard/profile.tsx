import { Card } from "../ui/card"

export const Profile = () => {
    return (
        <Card className="p-5">
            <div className="flex items-center gap-x-12">
                <img src="/icons/avatar-icon.svg" className="size-[70px]" />
                <div>
                    <h3 className=" text-black font-semibold text-xl">Jane Joyey.</h3>
                    <p className="text-brand-green font-normal">View Bio</p>
                </div>
            </div>
        </Card>
    )
}
