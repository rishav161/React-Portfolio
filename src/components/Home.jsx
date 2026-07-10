import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import resume from "../pdf/Rishav_Jaiswal_Resume.pdf"
import hero from "./data/hero.json"
import Typed from "typed.js";
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Home = () => {
  const typedRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [experienceMonths, setExperienceMonths] = useState(0)

  // Calculate experience in months from April 2025
  useEffect(() => {
    const startDate = new Date('2025-04-01')
    const currentDate = new Date()
    
    const yearsDiff = currentDate.getFullYear() - startDate.getFullYear()
    const monthsDiff = currentDate.getMonth() - startDate.getMonth()
    const totalMonths = yearsDiff * 12 + monthsDiff + 1 // +1 to include current month
    
    // If before start date, show 0, otherwise show calculated months
    setExperienceMonths(currentDate >= startDate ? totalMonths : 0)
    
    console.log('Experience calculation:', {
      startDate: startDate.toLocaleDateString(),
      currentDate: currentDate.toLocaleDateString(),
      yearsDiff,
      monthsDiff,
      totalMonths
    })
  }, [])

  useEffect(() => {
    setIsVisible(true)
    const options = {
      strings: [
        "Full-Stack Developer",
        // "React Specialist", 
        // "Node.js Developer",
        "Problem Solver",
        "Creative Thinker"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 2000
    }
    const typed = new Typed(typedRef.current, options)
    return () => {
      typed.destroy()
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="home" id='home'>
      <div className="container">
        <motion.div 
          className="home-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="left" 
            data-aos="fade-up-left" 
            data-aos-duration="1000"
            variants={itemVariants}
          >
            <div className={`intro-text ${isVisible ? 'visible' : ''}`}>
              <motion.h1 variants={itemVariants}>
                Hi, I'm <span className="highlight">Rishav Jaiswal</span> 👋
              </motion.h1>
              <motion.h2 variants={itemVariants}>
                I'm a <span ref={typedRef} className="typed-text"></span>
              </motion.h2>
              <motion.p className="description" variants={itemVariants}>
                Passionate software developer with {experienceMonths}+ months of experience building modern web applications. 
                I specialize in React, Node.js, and full-stack development, creating scalable solutions 
                that solve real-world problems.
              </motion.p>
              
              <motion.div className="stats" variants={statsVariants}>
                <motion.div className="stat" whileHover={{ scale: 1.05 }}>
                  <span className="number">{experienceMonths}+ </span>
                  <span className="label">{experienceMonths === 1 ? 'month' : 'months'} Experience</span>
                </motion.div>
                {/* <motion.div className="stat" whileHover={{ scale: 1.05 }}>
                  <span className="number">27+</span>
                  <span className="label">Projects</span>
                </motion.div> */}
                <motion.div className="stat" whileHover={{ scale: 1.05 }}>
                  <span className="number">15+</span>
                  <span className="label">Technologies</span>
                </motion.div>
              </motion.div>

              <motion.div className="cta-buttons" variants={itemVariants}>
                <motion.a 
                  href={resume} 
                  download="Rishav_Jaiswal_Resume.pdf" 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload />
                  Download Resume
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="btn btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>

              <motion.div className="social-links" variants={itemVariants}>
                <motion.a 
                  href="https://github.com/rishav161" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/rishav-jaiswal-55141824a/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a 
                  href="mailto:rishavjaiswal864@gmail.com" 
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEnvelope />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="right" 
            data-aos="fade-up-right" 
            data-aos-duration="1000"
            variants={itemVariants}
          >
            <motion.div 
              className="img"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.img 
                src={`/assets/Images/${hero.imgSrc}`} 
                alt="Rishav Jaiswal"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="floating-elements">
                <motion.div 
                  className="floating-card" 
                  style={{ '--delay': '0s' }}
                  animate={{ y: [-20, 20, -20] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>React</span>
                </motion.div>
                <motion.div 
                  className="floating-card" 
                  style={{ '--delay': '1s' }}
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>Node.js</span>
                </motion.div>
                <motion.div 
                  className="floating-card" 
                  style={{ '--delay': '2s' }}
                  animate={{ y: [-25, 25, -25] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>MongoDB</span>
                </motion.div>
                <motion.div 
                  className="floating-card" 
                  style={{ '--delay': '3s' }}
                  animate={{ y: [-18, 18, -18] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>TypeScript</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Home