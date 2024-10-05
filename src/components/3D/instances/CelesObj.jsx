export default function ({precision=64, radius=1, color='white'}) {
    return (
        <mesh position={[0,0,0]}>
            <sphereGeometry args={[radius, precision, precision]} />
        </mesh>
    )
}
