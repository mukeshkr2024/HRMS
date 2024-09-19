import { Loader } from "lucide-react"

export const CustomLoader = ({ className = "" }: { className?: string }) => (
    <div className={`flex h-full w-full items-center justify-center ${className}`}>
        <Loader className="animate-spin text-muted-foreground" />
    </div>
)
