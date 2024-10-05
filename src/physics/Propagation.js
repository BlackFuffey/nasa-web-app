import { useEffect, useState } from "react";

export default {
    getMotion: (
        semiMajorAxis,
        eccentricity,
        inclination,
        ascendingNodeLongitude,
        meanLongitude,
        meanAnomalyAtEpoch,
        period
    ) => {

        const kepletOrbit = (orbitalElements, timeElapsed) => {
            const [position, setPosition] = useState([0,0,0]);

            useEffect() => {
                const a = semiMajorAxis;
                const e = eccentricity;
                const i = inclination;
                const Ω = ascendingNodeLongitude;
                const w = meanLongitude;
                const M0 = meanAnomalyAtEpoch;
                const T = period; 
    
                //avg motion in radians per day
                const n = (2 * Math.PI) / T;
                
                //mean anomaly at current time (M = M0 + n * t)
                const M = M0 + n * timeElapsed;

                //solve Kepler's equation for Eccentric Anomaly
                let E = M; //M is initial guess, keeps iterating to solve M
                for (let i = 0; i < 10; i++) {
                    //M = E - e * sin(E)
                    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
                }

                //true anomaly v
                const v = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E /2));

                //orbital radius
                const r = a * (1 - e * Math.cos(E));

                //position of object in 3D space
                const x = r * (Math.cos(Ω) * Math.cos(w + ν) - Math.sin(Ω) * Math.sin(w + ν) * Math.cos(i));
                
            
            
            }
        }

        
        
    }


}