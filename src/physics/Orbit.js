
export default {
    getOrbitEllipse: (focus, semiMajorAxis, eccentricity) => {
        const a = semiMajorAxis; //semi major axis of earth in AU
        const e = eccentricity; //eccentricity of earth's orbit
        const b = a * Math.sqrt(1 - Math.pow(e, 2)); //semi minor axis
        const c = e * a; //distance from centre to a focus

        let [yc, zc] = focus;
        let xc = -c;



        

        // SEQUENCE OF ANGLES - creates an array of 80 values from -pi to pi radians

        const numOfPts = 80;

        return Array.from({length: numOfPts}, (v, i) => {
            const p = -Math.PI + (i * (2* Math.PI) / (numOfPts - 1))

            const cord = [ 
                a * Math.cos(p) - e,
                a * Math.sqrt(1 - Math.pow(e, 2)) * Math.sin(p),
                0
            ]

            let v3 = THREE.Vector3(...cord);

            const rotatePoints


        });
    


    },

    getOrbitRotation: () => {}
}
