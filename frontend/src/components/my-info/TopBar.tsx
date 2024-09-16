import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { cn } from "@/utils/cn";

type Props = {
    routes: { href: string, label: string }[],
}

export default function TopBar({ routes }: Props) {
    const { pathname } = useLocation();
    return (
        <div className="flex gap-x-6 pt-4">{
            routes.map((route) => (
                <Link to={route.href} key={route.href}>
                    <Button variant="outline" className={cn("rounded-[28px] h-8 font-semibold px-7", route.href === pathname ? "bg-[#D8FFF3] hover:bg-[#D8FFF3]" : "")}>{route.label}</Button>
                </Link>
            ))
        }</div>
    )
}
