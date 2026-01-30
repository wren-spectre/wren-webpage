import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
    Grid,
    Stars
} from '@react-three/drei'
import { EffectComposer, Scanline, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * FallingParticles: Implements vertical digital data particles.
 * Each particle possesses its own unique velocity and coordinates; 
 * opacity is dynamically adjusted based on its vertical position.
 */
const FallingParticles = ({ count }) => {
    const refs = useRef([])

    // Initialise particle data (position, speed)
    const particles = useMemo(() => {
        const data = []
        for (let i = 0; i < count; i++) {
            data.push({
                x: (Math.random() - 0.5) * 15,
                y: Math.random() * 6.4 - 3.2,
                z: (Math.random() - 0.5) * 10,
                speed: 0.01 + Math.random() * 0.25
            })
        }
        return data
    }, [count])

    // Update particle position and opacity on every frame (Digital Rain effect)
    useFrame(() => {
        refs.current.forEach((ref, i) => {
            if (ref && ref.material) {
                // Vertical descent movement
                ref.position.y -= particles[i].speed

                // Boundary check: re-position to the top (cyclic structure)
                if (ref.position.y < -3.2) {
                    ref.position.y = 3.2
                }

                // Sine-based Fade In/Out based on vertical position
                const progress = (ref.position.y - (-3.2)) / (3.2 - (-3.2))
                ref.material.opacity = Math.sin(progress * Math.PI) * 0.7
            }
        })
    })

    return (
        <group>
            {particles.map((p, i) => (
                <mesh key={i} ref={el => refs.current[i] = el} position={[p.x, p.y, p.z]}>
                    <boxGeometry args={[0.005, 0.5, 0.005]} />
                    <meshStandardMaterial
                        color="#1cb0a4"
                        emissive="#153f65"
                        emissiveIntensity={2}
                        transparent
                        opacity={0}
                    />
                </mesh>
            ))}
        </group>
    )
}

/**
 * Scene: Consists of all background elements within the 3D world.
 * Manages lighting, falling particles, dual grids, star clusters, and post-processing.
 */
const Scene = ({ activeSection }) => {
    const sceneRef = useRef()

    // Gradual rotation of the world to provide a cinematic sense of space
    useFrame(() => {
        if (sceneRef.current) {
            sceneRef.current.rotation.y += 0.0003
        }
    })

    return (
        <>
            <color attach="background" args={['#010101']} />
            <fog attach="fog" args={['#010101', 5, 15]} />

            <ambientLight intensity={0.2} />
            <pointLight position={[5, 10, 5]} intensity={0.5} color="#00f2ff" />

            <group ref={sceneRef}>
                <FallingParticles count={50} />

                {/* Floor Grid: Ground plane leading towards the vanishing point */}
                <Grid
                    infiniteGrid
                    fadeDistance={20}
                    fadeStrength={5}
                    cellSize={0.2}
                    sectionSize={1.0}
                    cellThickness={0.4}
                    sectionThickness={0.8}
                    cellColor="#3a4c95"
                    sectionColor="#1cb0a4"
                    position={[0, -3.2, 0]}
                />

                {/* Ceiling Grid: Forms the top plane to create a tunnel-like spatial effect */}
                <Grid
                    infiniteGrid
                    fadeDistance={20}
                    fadeStrength={5}
                    cellSize={0.15}
                    sectionSize={1.0}
                    cellThickness={0.4}
                    sectionThickness={0.8}
                    cellColor="#6534b4"
                    sectionColor="#1cb0a4"
                    position={[0, 3.2, 0]}
                    rotation={[Math.PI, 0, 0]}
                />

                {/* Background stars clusters */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </group>

            {/* Post-processing: Applies digital noise and vignetting effects across the entire screen */}
            <EffectComposer multisampling={0}>
                <Scanline density={1.2} opacity={0.03} />
                <Vignette offset={0.6} darkness={0.8} />
            </EffectComposer>
        </>
    )
}

export default Scene
