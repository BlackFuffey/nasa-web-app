import { 
    Input,
    Table,
    TableHeader, 
    TableColumn, 
    TableBody,
    TableRow,
    TableCell
} from "@nextui-org/react";
import { useState, useRef, useEffect} from "react";
import { SearchIcon } from "./SearchIcon";
import PlanetConsts from "@/data/PlanetConsts"
import CometConsts from "@/data/CometConsts"
import AsteroidConsts from "@/data/AsteroidConsts"
import { setTrackObj } from "../../3D/parts/CameraTracker";

export default function({selecState}) {
    const [searchContent, setSerchContent] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [searchRes, setSearchRes] = useState([]);
    const searchEntryRef = useRef([
        {name: "sun", type: 'planet'},
        ...Object.entries(PlanetConsts.orbit).map(([key]) => {return {name:key, type:"Planet"}}),
        ...Object.entries(CometConsts).map(([key]) => {return {name:key, type:"Comet"}}),
        ...Object.entries(AsteroidConsts.orbit).map(([key]) => {return {name:key, type:"Asteroid"}}),
    ])

    useEffect(() => {
        console.log(searchEntryRef.current)

        if (searchContent === '') return setSearchRes(searchEntryRef.current);

        setSearchRes(searchEntryRef.current.filter(e => 
            e.name.toLowerCase().includes(searchContent.toLowerCase())
        ))
    }, [searchContent])

    const teleport = (name, type) => {
        console.log('teleporting to '+name);
        setTrackObj(`${type.toLowerCase()}-${name}`);
        selecState[1](name==="sun" ? "sun star" : name+" "+type);
    }

    return (
        <div className="h-auto w-[35vw] space-y-1 pointer-event-auto">
            <Input
                size="md"
                placeholder="Search for celestial object"
                radius="full"
                isClearable
                onValueChange={setSerchContent}
                onFocus={() => setShowSearch(true)}
                onBlur={() => setShowSearch(false)}
                className="w-full pointer-events-auto bg-transparent"
                startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 flex-shrink-0" />
                }
            />
            { showSearch ? (
                <Table 
                    isHeaderSticky
                    aria-label="Example static collection table"
                    className="pointer-events-auto"
                    classNames={{
                        base: "overflow-scroll h-[90vh]"
                    }}
                >
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Type</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="No object found" className='pointer-events-auto'>
                        {searchRes.map(e => (
                            <TableRow 
                                className="text-white pointer-events-auto" 
                                key={`search-${Math.random().toString(36).substring(2, 8)}`}
                                onMouseDown={() => teleport(e.name, e.type)}
                            >
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.type}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            ) : null }
        </div>

    )
}

