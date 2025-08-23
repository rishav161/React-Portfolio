import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`nav_bar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className='nav-brand'>
          <a href="#home">Rishav.dev</a>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav_items" onClick={closeMenu}>Home</a>
          <a href="#experience" className="nav_items" onClick={closeMenu}>Experience</a>
          <a href="#skills" className="nav_items" onClick={closeMenu}>Skills</a>
          <a href="#project" className="nav_items" onClick={closeMenu}>Projects</a>
          <a href="#certifications" className="nav_items" onClick={closeMenu}>Certifications</a>
          <a href="#coding-profiles" className="nav_items" onClick={closeMenu}>Coding</a>
          <a href="#contact" className="nav_items" onClick={closeMenu}>Contact</a>
        </div>
        
        <div className="nav-controls">
          <ThemeToggle />
          <div className="nav-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar