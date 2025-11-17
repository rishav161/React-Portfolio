import { useState } from 'react'
import { motion } from 'framer-motion'

const ProjectFilter = ({ projects, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All')

  // Define specific filters
  const filters = [
    { label: 'All', value: 'All' },
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'Node.js', value: 'Node.js' },
    { label: 'React', value: 'React' },
    { label: 'Next.js', value: 'Next.js' }
  ]

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

  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue)
    onFilterChange(filterValue)
  }

  // Count projects for each filter
  const getProjectCount = (filterValue) => {
    if (filterValue === 'All') return projects.length
    return projects.filter(project => 
      project.technologies?.some(tech => normalizeMatch(tech, filterValue))
    ).length
  }

  return (
    <div className="project-filters" data-aos="fade-up" data-aos-duration="1000">
      <div className="filter-buttons">
        {filters.map((filter) => {
          const count = getProjectCount(filter.value)
          return (
            <motion.button
              key={filter.value}
              className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={count === 0}
            >
              {filter.label} <span className="filter-count">({count})</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectFilter
