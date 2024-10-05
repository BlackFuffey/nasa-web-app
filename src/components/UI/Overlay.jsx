import { NextUIProvider } from "@nextui-org/react";
import SearchBar from "./parts/SearchBar";

export default function() {
    return (
        <NextUIProvider>
            <SearchBar />
        </NextUIProvider>
    )
}
