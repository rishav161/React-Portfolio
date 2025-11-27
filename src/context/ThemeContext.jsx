import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved !== null) {
      return JSON.parse(saved)
    }
    // Auto-detect system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [accentColor, setAccentColor] = useState(() => {
    const saved = localStorage.getItem('accentColor')
    return saved || '#f59e0b'
  })

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const userPreference = localStorage.getItem('theme')
      if (userPreference === null) {
        setIsDarkMode(e.matches)
      }
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  // Time-based auto-switching (6 PM to 6 AM = dark mode)
  useEffect(() => {
    const checkTimeBasedTheme = () => {
      const userPreference = localStorage.getItem('theme')
      if (userPreference === null) {
        const hour = new Date().getHours()
        const shouldBeDark = hour >= 18 || hour < 6
        setIsDarkMode(shouldBeDark)
      }
    }

    // Check every hour
    const interval = setInterval(checkTimeBasedTheme, 3600000)
    checkTimeBasedTheme() // Check immediately

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode))
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem('accentColor', accentColor)
    document.documentElement.style.setProperty('--accent-color', accentColor)
  }, [accentColor])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const changeAccentColor = (color) => {
    setAccentColor(color)
  }

  const value = {
    isDarkMode,
    toggleTheme,
    accentColor,
    changeAccentColor
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
