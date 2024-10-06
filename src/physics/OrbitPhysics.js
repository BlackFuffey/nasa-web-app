import * as THREE from 'three'

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
        eccentricity,
        inclination,
        ascendingNodeLongitude,
        meanLongitude,
        meanAnomalyAtEpoch,
        period,
        timeElapsed
    ) => {

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
        const x = r * (Math.cos(Ω) * Math.cos(w + v) - Math.sin(Ω) * Math.sin(w + v) * Math.cos(i));
        const y = r * (Math.cos(Ω) * Math.cos(w + v) + Math.sin(Ω) * Math.sin(w + v) * Math.cos(i));
        const z = r * (Math.sin(i) * Math.sin(w + v));


        return [x, y, z];

    }
}
