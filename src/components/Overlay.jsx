import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Mail, Github, Menu, ChevronDown, X } from 'lucide-react'

/**
 * Overlay: Manages the UI layer of the website.
 * Responsible for navigation, content sections, footers, and page transition animations.
 */
const Overlay = ({ activeSection, setActiveSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const sections = ['profile', 'playlist', 'solution', 'contact']

    // Close menu when a section is selected
    const handleSectionChange = (section) => {
        setActiveSection(section)
        setIsMenuOpen(false)
    }

    // Renders content based on the currently active section
    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <div className="profile-container">
                        <div className="profile-image-wrapper">
                            <img
                                src={`${import.meta.env.BASE_URL}profile/profile-wrenspectre-1.42mb.png`}
                                alt="wren spectre profile"
                                className="profile-image"
                            />
                        </div>
                        <h1 className="title">wren spectre</h1>
                        <p className="subtitle" style={{ fontSize: '1.2rem', color: '#00f2ff', marginBottom: '0.05rem' }}>
                            Disc jockey who plans solutions
                        </p>
                        <p style={{ fontSize: '1.0rem', opacity: 0.6, marginBottom: '1rem' }}>
                            London, United Kingdom
                        </p>
                        <p className="description">
                            Integrating the rhythm of the floor with the logic of system design.<br />
                            As a DJ, I curate sonic experiences that move the soul.<br />
                            As a planner, I architect strategic solutions that drive progress.<br /><br />
                            Welcome to the intersection of art and logic!
                        </p>
                    </div>
                )
            case 'playlist':
            case 'solution':
                return <h2 className="title">coming soon !</h2>
            case 'contact':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h2 className="title">contact me !</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem', alignItems: 'flex-start' }}>
                            <a href="mailto:wrenspectre@gmail.com" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none' }}>
                                <Mail size={20} color="#00f2ff" /> wrenspectre@gmail.com
                            </a>
                            <a href="https://www.instagram.com/wrenspectre" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none' }}>
                                <Instagram size={20} color="#ff00ff" /> @wrenspectre
                            </a>
                            <a href="https://github.com/wren-spectre" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none' }}>
                                <Github size={20} color="#00f2ff" /> github.com/wren-spectre
                            </a>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="overlay">
            {/* Desktop Navigation */}
            <nav className="nav">
                {sections.map(section => (
                    <button
                        key={section}
                        className={`nav-item ${activeSection === section ? 'active' : ''}`}
                        onClick={() => setActiveSection(section)}
                    >
                        {section.toUpperCase()}
                    </button>
                ))}
            </nav>

            {/* Mobile Menu Trigger */}
            <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span>{activeSection.toUpperCase()}</span>
                <ChevronDown size={14} style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="mobile-dropdown"
                        initial={{ opacity: 0, y: -10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -10, x: '-50%' }}
                        transition={{ duration: 0.2 }}
                    >
                        {sections.map(section => (
                            <button
                                key={section}
                                className={`dropdown-item ${activeSection === section ? 'active' : ''}`}
                                onClick={() => handleSectionChange(section)}
                            >
                                {section.toUpperCase()}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content area: Animations applied on section transitions */}
            <main style={{ marginTop: 'auto', marginBottom: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div className="content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Bottom footer area */}
            <footer className="footer">
                © 2026 wren spectre from mirrors of eden02 lab. All rights reserved.
            </footer>
        </div>
    )
}

export default Overlay
