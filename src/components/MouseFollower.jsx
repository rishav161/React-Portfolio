import { useEffect, useState, useRef } from 'react'
import './MouseFollower.css'

const MouseFollower = () => {
  const [particles, setParticles] = useState([])
  const [bubbles, setBubbles] = useState([])
  const particleIdRef = useRef(0)
  const bubbleIdRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Create new particle at mouse position
      const newParticle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4, // Random size between 4-12px
        duration: Math.random() * 1 + 0.5, // Random duration 0.5-1.5s
        delay: Math.random() * 0.2,
        type: 'particle'
      }

      setParticles(prev => [...prev, newParticle])

      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id))
      }, (newParticle.duration + newParticle.delay) * 1000)
    }

    const handleClick = (e) => {
      // Create multiple bubbles spreading out from click position
      const bubbleCount = 20 // Number of bubbles to create (increased from 8 to 20)
      const newBubbles = []

      for (let i = 0; i < bubbleCount; i++) {
        const angle = (Math.PI * 2 * i) / bubbleCount
        const distance = Math.random() * 120 + 60 // Random distance 60-180px
        
        const newBubble = {
          id: bubbleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          angle: angle,
          distance: distance,
          size: Math.random() * 20 + 8, // Random size between 8-28px
          duration: Math.random() * 0.6 + 0.7, // Random duration 0.7-1.3s
          type: 'bubble'
        }
        
        newBubbles.push(newBubble)
      }

      setBubbles(prev => [...prev, ...newBubbles])

      // Remove bubbles after animation
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => !newBubbles.find(nb => nb.id === b.id)))
      }, 1500)
    }

    // Throttle mouse move for performance
    let throttleTimer = null
    const throttledMouseMove = (e) => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          handleMouseMove(e)
          throttleTimer = null
        }, 50) // Create particle every 50ms
      }
    }

    window.addEventListener('mousemove', throttledMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      window.removeEventListener('click', handleClick)
      if (throttleTimer) clearTimeout(throttleTimer)
    }
  }, [])

  return (
    <div className="mouse-particles-container">
      {/* Mouse trail particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="mouse-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Click bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="click-bubble"
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            '--angle': `${bubble.angle}rad`,
            '--distance': `${bubble.distance}px`,
            animationDuration: `${bubble.duration}s`
          }}
        />
      ))}
    </div>
  )
}

export default MouseFollower
