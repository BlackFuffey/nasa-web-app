import * as THREE from 'three'
import { computePosition } from './Propagate'

export default {
    getOrbitEllipse: (
        focus, 
        semiMajorAxis, 
        eccentricity, 
        inclination,
        meanLongitude,
        ascendingNodeLongitude
    ) => {
        const a = semiMajorAxis; //semi major axis of earth in AU
        const e = eccentricity; //eccentricity of earth's orbit
        const b = a * Math.sqrt(1 - Math.pow(e, 2)); //semi minor axis
        const c = e * a; //distance from centre to a focus

        let [yc, zc] = focus;
        let xc = -c;

        const xAxis = new THREE.Vector3(1, 0, 0);
        const yAxis = new THREE.Vector3(0, 1, 0);
        const zAxis = new THREE.Vector3(0, 0, 1);



        // SEQUENCE OF ANGLES - creates an array of 80 values from -pi to pi radians

        const numOfPts = 80;

        return Array.from({length: numOfPts}, (v, i) => {
            const p = -Math.PI + (i * (2* Math.PI) / (numOfPts - 1))

            const cord = [ 
                a * Math.cos(p) - e,
                a * Math.sqrt(1 - Math.pow(e, 2)) * Math.sin(p),
                0
            ]

            const v3 = new THREE.Vector3(...cord);

            v3.applyAxisAngle(yAxis, inclination*(Math.PI/180));
            v3.applyAxisAngle(zAxis, meanLongitude*(Math.PI/180));
            v3.applyAxisAngle(xAxis, ascendingNodeLongitude*(Math.PI/180));

            return v3
        });
    },

    getMotion: (
        semiMajorAxis,
        inclination,
        eccentricity,
        meanLongitude,
        ascendingNodeLongitude,
        period,
        timeSincePP
    ) => {
        const v3 = computePosition(
            eccentricity, semiMajorAxis, period, timeSincePP
        )

        const xAxis = new THREE.Vector3(1, 0, 0);
        const yAxis = new THREE.Vector3(0, 1, 0);
        const zAxis = new THREE.Vector3(0, 0, 1);

        v3.applyAxisAngle(yAxis, inclination*(Math.PI/180));
        v3.applyAxisAngle(zAxis, meanLongitude*(Math.PI/180));
        v3.applyAxisAngle(xAxis, ascendingNodeLongitude*(Math.PI/180));
        
        return v3;
    }
}
