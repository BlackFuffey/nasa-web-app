export default function ({ position = [0, 0, 0] }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[1, 64, 64]} />
        </mesh>
    )
}
