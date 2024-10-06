import { Input } from "@nextui-org/react";
import { useState } from "react";
import { SearchIcon } from "./SearchIcon";

export default function() {
    const [searchContent, setSerchContent] = useState('');

    return (
        <div className="h-auto w-[50vw]">
            <Input
                size="md"
                placeholder="Search for celestial object"
                radius="full"
                isClearable
                onChange={e => setSerchContent(e.target.value)}
                className="w-full pointer-events-auto bg-transparent"
                startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />


        </div>

    )
}

