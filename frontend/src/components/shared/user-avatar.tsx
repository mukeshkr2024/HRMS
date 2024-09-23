import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const UserAvatar = ({
    avatar,
    name,
    className
}: {
    avatar: string | undefined,
    name: string | undefined,
    className?: string
}) => {
    return (
        <Avatar className={className}>
            <AvatarImage
                src={avatar}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
    );
}
