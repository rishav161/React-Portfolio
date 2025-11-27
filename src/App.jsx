import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Experience from "./components/Experience"
import Skill from "./components/Skill"
import Projects from "./components/Project"
import Certifications from "./components/Certifications"
import CodingProfiles from "./components/CodingProfiles"
import Contact from "./components/Contact"
import MusicPlayer from "./components/MusicPlayer"
import MouseFollower from "./components/MouseFollower"
import Aos from "aos"
import "aos/dist/aos.css"

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    Aos.init({
      duration: 1000,
      once: true,
      offset: 100
    })

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.pageYOffset / totalScroll) * 100
      setScrollProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])
  
  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-logo">Rishav.dev</div>
            <div className="loading-spinner"></div>
            <p>Loading amazing things...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }
  
  return (
    <ThemeProvider>
      {/* Mouse Follower Animation - Blue dots that follow mouse across all sections */}
      <MouseFollower />
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      <Navbar />
      <main>
        <Home />
        <Experience />
        <Skill />
        <Projects />
        <Certifications />
        <CodingProfiles />
        <Contact />
      </main>
      
      {/* Back to Top Button */}
      {scrollProgress > 20 && (
        <button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}

      {/* Music Player */}
      <MusicPlayer />
    </ThemeProvider>
  )
}

export default App
