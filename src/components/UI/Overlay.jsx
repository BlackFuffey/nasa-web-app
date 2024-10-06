import { NextUIProvider } from "@nextui-org/react";
import { useState } from "react";
import InfoPanel from "./parts/InfoPanel";
import SearchBar from "./parts/SearchBar";

export default function() {
    const selecState = useState('');

    return (
        <NextUIProvider>
            <div className="absolute inset-0 dark h-full w-full z-10 m-3 pointer-events-none">
                <SearchBar selecState={selecState}/>
                <InfoPanel selecState={selecState}/>
            </div>
        </NextUIProvider>
    )
}
