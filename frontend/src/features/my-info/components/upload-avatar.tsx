import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { CameraIcon } from 'lucide-react';
import { useUploadAvatar } from '@/features/my-info/api/use-upload-avatar';
import { useToast } from '@/components/ui/use-toast';

export const UploadAvatar = ({ name, avatar }: { name: string, avatar: string }) => {
    const [hover, setHover] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { mutate: uploadAvatar } = useUploadAvatar();
    const { toast } = useToast()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Validate file size (2MB = 2 * 1024 * 1024 bytes)
            if (file.size > 2 * 1024 * 1024) {
                toast({
                    title: 'Error',
                    description: 'Please upload an image smaller than 2MB.',
                    variant: 'destructive',
                });
                return;
            }

            setSelectedFile(file);
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
            <Avatar className="size-24">
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
