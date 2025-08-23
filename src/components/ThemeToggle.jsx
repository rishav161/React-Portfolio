import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon, FaPalette, FaChevronDown } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, accentColor, changeAccentColor } = useTheme()
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  const accentColors = [
    '#f59e0b', // Orange
    '#3b82f6', // Blue
    '#10b981', // Green
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#f97316', // Orange Red
    '#06b6d4', // Cyan
  ]

  return (
    <div className="theme-toggle">
      {/* Theme Toggle Button */}
      <motion.button
        className="theme-btn"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </motion.button>

      {/* Accent Color Picker */}
      <div className="color-picker-container">
        <motion.button
          className="color-picker-btn"
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPalette />
          <FaChevronDown className={`chevron ${isColorPickerOpen ? 'rotated' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {isColorPickerOpen && (
            <motion.div
              className="color-picker"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {accentColors.map((color) => (
                <motion.button
                  key={color}
                  className={`color-option ${accentColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    changeAccentColor(color)
                    setIsColorPickerOpen(false)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  title={`Accent color: ${color}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ThemeToggle
