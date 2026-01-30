import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import './App.css'

function App() {
    // Manages the state of the currently active section (profile, playlist, solution, contact)
    const [activeSection, setActiveSection] = useState('profile')

    return (
        <div className="app-container">
            {/* 3D Background Rendering Area */}
            <div className="canvas-container">
                <Canvas
                    shadows
                    // Limit Device Pixel Ratio for performance optimisation
                    dpr={[1, 1.5]}
                    performance={{ min: 0.5 }}
                    gl={{ antialias: false, powerPreference: 'high-performance' }}
                >
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
                    <Scene activeSection={activeSection} />
                </Canvas>
            </div>

            {/* UI Element Rendering Area (Menu, content box, etc.) */}
            <Overlay activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
    )
}

export default App
