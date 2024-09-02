import { forwardRef } from 'react';
import { cn } from "@/utils/cn";
import { Textarea } from '../ui/textarea';

interface CustomTextAreaProps {
    placeholder?: string;
    onError?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    type?: string;
    [key: string]: any;
    className?: string;
}

export const CustomTextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(({
    placeholder,
    onError,
    disabled,
    type,
    readOnly,
    className,
    ...rest
}, ref) => {
    return (
        <Textarea
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
                "rounded-[4px] bg-[#FFFFFF] placeholder:text-[#707070] border-b-2 border-[#D1D1D1] hover:border-b-[#575757] focus:border-b-[#1FBE8E] focus:border-b-[3px]",
                onError && "border-[#C50F1F]",
                disabled && "border-[#E0E0E0] placeholder:text-[#BDBDBD]",
                readOnly && "border-[#E0E0E0] placeholder:text-[#242424]", className
            )}
            {...rest}
        />
    );
});

CustomTextArea.displayName = 'CustomTextArea';
