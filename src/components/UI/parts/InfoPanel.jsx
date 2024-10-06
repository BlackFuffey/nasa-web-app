import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import Services from "../../../service/service";
import {useState, useEffect} from 'react'
import PlanetConsts from "../../../data/PlanetConsts";
import AsteroidConsts from "../../../data/AsteroidConsts";
import CometConsts from "../../../data/CometConsts";

export default function ({selecState}) {
    
    const [displayCont, setDisplayCont] = useState('');

    useEffect(() => { (async () => {
        try { setDisplayCont(await Services.instantResponse(selecState[0])) }
        catch (e) { setDisplayCont("Couldn't fetch data from DuckDuckGo") }
    })() }, [selecState[0]] );

    return (
        <Card className="max-w-[400px] absolute right-5 top-2 ">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">{selecState[0].split(' ')[0]}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <p>{displayCont}</p>
            </CardBody>
            <Divider/>
            <CardFooter>
                {(() => {
                    const arr = selecState[0].split(' ');
                    const type = arr.pop().toLowerCase();
                    console.log(type);

                    if (type === 'planet') return JSON.stringify(PlanetConsts.orbit[arr.join()], null, 4);
                    
                    if (type === 'astroid') return JSON.stringify(AsteroidConsts.orbit[arr.join()], null, 4);

                    if (type === 'comet') return JSON.stringify(CometConsts[arr.join()], null, 4);
                    
                    
                    
                })()}
            </CardFooter>
        </Card>
    )
}
