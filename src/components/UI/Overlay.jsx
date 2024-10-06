import { NextUIProvider } from "@nextui-org/react";
import SearchBar from "./parts/SearchBar";

export default function() {
    return (
        <NextUIProvider>
            <div className="absolute inset-0 dark h-full w-full z-10 m-3 pointer-events-none">
                <SearchBar/>
            </div>
        </NextUIProvider>
    )
}
