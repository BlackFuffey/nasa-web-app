// Helper function to solve Kepler's equation using Newton-Raphson method
function solveKepler(e, M) {
    let tol = 1.0e-14;
    let E0 = M; // Start with E0 = M (initial guess)
    let dE = tol + 1;
    let count = 0;

    while (dE > tol) {
        // f(E) = E - e * sin(E) - M
        let f = E0 - e * Math.sin(E0) - M;
        // f'(E) = 1 - e * cos(E)
        let f_prime = 1 - e * Math.cos(E0);
        // Update E using Newton-Raphson method
        let E = E0 - f / f_prime;
        dE = Math.abs(E - E0);
        E0 = E;
        count += 1;

        // Safety check to prevent infinite loop
        if (count > 100) {
            console.error("KeplerSolve failed to converge");
            break;
        }
    }

    return E0;
}

// Function to calculate the position of the object at a given time (clock)
function computePosition(e, a, T, clock) {
    // Step 1: Compute the mean anomaly (M)
    let n = 2 * Math.PI / T; // Mean motion
    let tau = 0; // Time of pericenter passage (assumed to be zero)
    let M = n * (clock - tau); // Mean anomaly

    // Step 2: Solve Kepler's equation for eccentric anomaly (E)
    let E = solveKepler(e, M);

    // Step 3: Compute the orbital radius (r) and position in the orbital plane
    let cose = Math.cos(E);
    let r = a * (1 - e * cose);
    let s_x = r * ((cose - e) / (1 - e * cose));
    let s_y = r * ((Math.sqrt(1 - e * e) * Math.sin(E)) / (1 - e * cose));
    let s_z = 0; // Assume the orbit lies in the XY plane

    // Step 4: Rotate the coordinates using THREE.js (as math tools)
    let point = new THREE.Vector3(s_x, s_y, s_z);

    // Rotation 1 (about Y-axis by pi/5)
    let rotation1 = new THREE.Matrix4().makeRotationY(Math.PI / 5);
    point.applyMatrix4(rotation1);

    // Rotation 2 (about Z-axis by pi/4)
    let rotation2 = new THREE.Matrix4().makeRotationZ(Math.PI / 4);
    point.applyMatrix4(rotation2);

    // Rotation 3 (about X-axis by pi/4)
    let rotation3 = new THREE.Matrix4().makeRotationX(Math.PI / 4);
    point.applyMatrix4(rotation3);

    return point;
}

// Example usage
let e = 0.1;          // Eccentricity
let a = 10000;        // Semi-major axis (in arbitrary units, e.g., km)
let T = 86400;        // Orbital period (in seconds, e.g., 1 day)
let clock = 43200;    // Time for which to compute position (in seconds, e.g., halfway through the orbit)

let position = computePosition(e, a, T, clock);
console.log(position); // Output: the 3D coordinates [x, y, z]