export default function ({position=[0,0,0], precision=64, radius=1, color='white'}) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.1, precision, precision]} color='yellow' />
        </mesh>
    )
}
