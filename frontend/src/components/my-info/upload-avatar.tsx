import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CameraIcon } from 'lucide-react';
import { useUploadAvatar } from '@/api/employee/use-upload-avatar';

export const UploadAvatar = ({ name, avatar }: { name: string, avatar: string }) => {
    const [hover, setHover] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { mutate: uploadAvatar } = useUploadAvatar();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            uploadAvatar(formData);
        }
    };

    useEffect(() => {
        if (selectedFile) {
            handleUpload();
        }
    }, [selectedFile]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Avatar className="w-[124px] h-[124px]">
                <AvatarImage src={avatar} alt={`${name}'s avatar`} />
                <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            {hover && (
                <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer rounded-full"
                >
                    <label className="flex flex-col items-center">
                        <CameraIcon className="w-6 h-6 text-white" />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};
