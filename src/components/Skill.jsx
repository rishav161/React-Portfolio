import React from 'react'
import skills from "./data/skills.json"
import { FaCode, FaDatabase, FaTools } from 'react-icons/fa'
import CollapsibleSection from './CollapsibleSection'

const Skill = () => {
  // Categorize skills
  const skillCategories = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    database: skills.filter(skill => skill.category === 'database'),
    tools: skills.filter(skill => skill.category === 'tools')
  }

  const categoryIcons = {
    frontend: FaCode,
    backend: FaCode,
    database: FaDatabase,
    tools: FaTools
  }

  const categoryNames = {
    frontend: 'Frontend Development',
    backend: 'Backend Development', 
    database: 'Databases',
    tools: 'ORM & Tools'
  }

  const getImageSrc = (imageSrc) => {
    if (imageSrc.startsWith('http')) {
      return imageSrc
    }
    return `/assets/Images/${imageSrc}`
  }

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Skills & Technologies</h1>
          <p>Technologies and tools I use to bring ideas to life</p>
        </div>
        
        <div className="skills-container">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <CollapsibleSection 
              key={category}
              title={categoryNames[category]}
              defaultOpen={category === 'frontend'}
            >
              <div className="skill-category">
                <div className="category-header">
                  {React.createElement(categoryIcons[category], { className: 'category-icon' })}
                  <h3>{categoryNames[category]}</h3>
                </div>
                
                <div className="items">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill.title}
                      className="item"
                      data-aos="zoom-in"
                      data-aos-duration="1000"
                      data-aos-delay={index * 100}
                    >
                      <div className="skill-icon">
                        <img 
                          src={getImageSrc(skill.imageSrc)} 
                          alt={skill.title}
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="fallback-icon" style={{ display: 'none' }}>
                          {skill.title.charAt(0)}
                        </div>
                      </div>
                      <h3>{skill.title}</h3>
                      <div className="skill-level">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                        <span className="percentage">{skill.proficiency}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skill