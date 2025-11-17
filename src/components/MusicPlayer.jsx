import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaTimes, FaHeadphones } from 'react-icons/fa'

const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const audioRef = useRef(null)

  // Soothing background music tracks (using royalty-free music URLs)
  const tracks = [
    {
      name: "Calm Waves",
      url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3"
    },
    {
      name: "Creative Minds",
      url: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
    },
    {
      name: "Acoustic Breeze",
      url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
    }
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true)
    }
    setIsPlaying(!isPlaying)
  }

  const handleToggleOpen = () => {
    setIsOpen(!isOpen)
    // Don't stop music when closing, only when explicitly paused
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleTrackEnd = () => {
    nextTrack()
  }

  return (
    <>
      {/* Floating Music Button */}
      <div className="music-toggle-wrapper">
        <motion.button
          className="music-toggle-btn"
          onClick={handleToggleOpen}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <FaHeadphones />
          {isPlaying && <span className="playing-indicator"></span>}
        </motion.button>
        
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              className="music-tooltip"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {isPlaying ? 'Music Playing' : 'Play Background Music'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Music Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="music-player"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="music-player-header">
              <div className="track-info">
                <FaMusic className="music-icon" />
                <div>
                  <h4>Now Playing</h4>
                  <p>{tracks[currentTrack].name}</p>
                </div>
              </div>
              <motion.button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>

            <div className="music-controls">
              <motion.button
                onClick={prevTrack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="control-btn"
              >
                <FaStepBackward />
              </motion.button>

              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="control-btn play-btn"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </motion.button>

              <motion.button
                onClick={nextTrack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="control-btn"
              >
                <FaStepForward />
              </motion.button>
            </div>

            <div className="volume-control">
              <motion.button
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="volume-btn"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </motion.button>

              <AnimatePresence>
                {showVolumeSlider && (
                  <motion.div
                    className="volume-slider-container"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                    <span className="volume-percentage">{Math.round(volume * 100)}%</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="track-list">
              {tracks.map((track, index) => (
                <motion.button
                  key={index}
                  className={`track-item ${currentTrack === index ? 'active' : ''}`}
                  onClick={() => setCurrentTrack(index)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="track-number">{index + 1}</span>
                  <span className="track-name">{track.name}</span>
                  {currentTrack === index && isPlaying && (
                    <motion.span
                      className="playing-bars"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio element stays mounted even when panel is closed */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        onEnded={handleTrackEnd}
        loop={false}
      />
    </>
  )
}

export default MusicPlayer
