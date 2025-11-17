import { useState, useMemo } from 'react'
import project from "./data/projects.json"
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye, FaStar, FaFilter } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectFilter from './ProjectFilter'

const Project = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  // Normalize technology names for matching
  const normalizeMatch = (tech, filterValue) => {
    const techLower = tech.toLowerCase()
    const filterLower = filterValue.toLowerCase()
    
    // Handle variations
    if (filterLower === 'next.js') {
      return techLower.includes('next')
    }
    if (filterLower === 'node.js') {
      return techLower.includes('node')
    }
    if (filterLower === 'react') {
      return techLower === 'react' || techLower === 'react.js'
    }
    
    return techLower === filterLower
  }

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return project
    return project.filter(p => 
      p.technologies && p.technologies.some(tech => normalizeMatch(tech, activeFilter))
    )
  }, [activeFilter])

  return (
    <section className="proj" id="project">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Featured Projects</h1>
          <p>A showcase of my recent work, demonstrating my skills in full-stack development and problem-solving</p>
          
          <motion.button 
            className="toggle-filter-btn"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter /> {showFilters ? 'Hide' : 'Show'} Filters
          </motion.button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectFilter 
                projects={project} 
                onFilterChange={setActiveFilter}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="project-count">
          Showing {filteredProjects.length} of {project.length} projects
        </div>
        
        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((data, index) => (
            <motion.div
              key={data.key}
              className="project-card"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 100}
              onMouseEnter={() => setHoveredCard(data.key)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {index === 0 && (
                <div className="featured-badge">
                  <FaStar /> Featured
                </div>
              )}
              
              <div className="image-container">
                <img
                  src={data.imageSrc.startsWith('http') ? data.imageSrc : `/assets/Images/${data.imageSrc}`}
                  alt={data.title}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <div className="overlay-buttons">
                    <motion.a 
                      href={data.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="overlay-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEye />
                      <span>Live Demo</span>
                    </motion.a>
                    <motion.a 
                      href={data.source} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="overlay-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaCode />
                      <span>View Code</span>
                    </motion.a>
                  </div>
                </div>
              </div>
              
              <div className="content">
                <h3>{data.title}</h3>
                <p className="project-description">{data.description}</p>
                
                <div className="project-tech">
                  {data.technologies && data.technologies.slice(0, 4).map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex} 
                      className="tech-tag"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {data.technologies && data.technologies.length > 4 && (
                    <span className="tech-tag more-tech">+{data.technologies.length - 4}</span>
                  )}
                </div>
                
                <div className="buttons">
                  <motion.a 
                    href={data.source} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                    Code
                  </motion.a>
                  <motion.a 
                    href={data.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="more-projects" data-aos="fade-up" data-aos-duration="1000">
          <p>Want to see more of my work?</p>
          <motion.a 
            href="https://github.com/rishav161" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            View All Projects
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Project;
