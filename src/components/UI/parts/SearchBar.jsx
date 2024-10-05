import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

export default function() {
    return (
        <Input
            size="md"
            placeholder="Search for celestial object"
            radius="full"
            isClearable
            classNames={{
                input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ]
            }}
            startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
        />
    )
}

