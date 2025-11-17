import { useState } from 'react'
import { motion } from 'framer-motion'

const ProjectFilter = ({ projects, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All')

  // Extract unique technologies from all projects
  const allTechnologies = [...new Set(
    projects.flatMap(project => project.technologies || [])
  )]

  const filters = ['All', ...allTechnologies.slice(0, 8)] // Limit to 8 most common

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  return (
    <div className="project-filters" data-aos="fade-up" data-aos-duration="1000">
      <div className="filter-buttons">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ProjectFilter
