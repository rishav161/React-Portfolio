import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'experience', 'skills', 'project', 'certifications', 'coding-profiles', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto'
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = 'auto'
  }

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#project', label: 'Projects', id: 'project' },
    { href: '#certifications', label: 'Certifications', id: 'certifications' },
    { href: '#coding-profiles', label: 'Coding', id: 'coding-profiles' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ]

  return (
    <motion.nav 
      className={`nav_bar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container nav-container">
        <motion.div 
          className='nav-brand'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#home">Rishav.dev</a>
        </motion.div>
        
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth > 768) && (
            <motion.div 
              className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={`nav_items ${activeSection === item.id ? 'active' : ''}`}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="nav-controls">
          <ThemeToggle />
          <motion.div 
            className="nav-toggle" 
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar