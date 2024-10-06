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
import { useFrame } from '@react-three/fiber'

const SearchResultTable = ({ results, onItemClick }) => (
    <Table
        aria-label="Search results"
        css={{ height: "auto", minWidth: "100%" }}
    >
        <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>Description</Table.Column>
        </Table.Header>
        <Table.Body>
            {results.map((result, index) => (
                <Table.Row key={index} onClick={() => onItemClick(result)}>
                    <Table.Cell>{result.name}</Table.Cell>
                    <Table.Cell>{result.description}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
);

// Usage example
const handleItemClick = (item) => {
    console.log("Clicked item:", item);
};


export default function() {
    const [searchContent, setSerchContent] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [searchRes, setSearchRes] = useState([]);
    const searchEntryRef = useRef([
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

    const teleport = (name) => {

    }

    return (
        <div className="h-auto w-[35vw] space-y-1">
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
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
            />
            { showSearch ? (
                <Table 
                    isHeaderSticky
                    selectionMode="single"
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
                    <TableBody emptyContent="No object found">
                        {searchRes.map(e => (
                            <TableRow 
                                className="text-white" 
                                key={`search-${Math.random().toString(36).substring(2, 8)}`}
                                onClick={() => teleport(e.name)}
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

