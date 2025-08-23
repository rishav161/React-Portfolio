import experience from "./data/experience.json"
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import CollapsibleSection from './CollapsibleSection'

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Professional Experience</h1>
          <p>My journey in software development, working with cutting-edge technologies and solving complex problems</p>
        </div>
        
        <div className="experience-items">
          {experience.map((data, index) => (
            <CollapsibleSection 
              key={data.id}
              title={`${data.role} at ${data.organisation}`}
              defaultOpen={index === 0}
            >
              <div className="experience-item">
                <div className="company-info">
                  <div className="details">
                    <h2>{data.role}</h2>
                    <h3>{data.organisation}</h3>
                    <div className="meta">
                      <span className="date">
                        <FaCalendarAlt />
                        {data.startDate} - {data.endDate}
                      </span>
                      <span className="location">
                        <FaMapMarkerAlt />
                        {data.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <ul>
                  {data.experiences.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
                
                <div className="tech-stack">
                  <span className="tech-label">Technologies:</span>
                  <div className="tech-tags">
                    {data.technologies && data.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
