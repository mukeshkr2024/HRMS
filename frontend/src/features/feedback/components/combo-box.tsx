import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/cn";

interface DataItem {
    _id: string;
    name: string;
}

interface Props {
    data: DataItem[];
    value: string;
    setValue: (id: string) => void;
}

export const ComboBox: React.FC<Props> = ({ data, value, setValue }) => {
    const [open, setOpen] = React.useState(false);

    const selectedName = React.useMemo(() => {
        return data.find((item) => item._id === value)?.name || "Select member...";
    }, [data, value]);

    const handleSelect = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] lg:w-[280px] justify-between h-9"
                >
                    {selectedName}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search member..." />
                    <CommandList>
                        <CommandEmpty>No member found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((member) => (
                                <CommandItem
                                    key={member._id}
                                    value={member._id}
                                    onSelect={() => handleSelect(member._id)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === member._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {member.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
