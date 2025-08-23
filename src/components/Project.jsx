import project from "./data/projects.json"
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from 'react-icons/fa'

const Project = () => {
  return (
    <section className="proj" id="project">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Featured Projects</h1>
          <p>A showcase of my recent work, demonstrating my skills in full-stack development and problem-solving</p>
        </div>
        
        <div className="projects-grid">
          {project.map((data, index) => (
            <div
              key={data.key}
              className="project-card"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 200}
            >
              <div className="image-container">
                <img
                  src={data.imageSrc.startsWith('http') ? data.imageSrc : `/assets/Images/${data.imageSrc}`}
                  alt={data.title}
                />
                <div className="image-overlay">
                  <div className="overlay-buttons">
                    <a href={data.demo} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                      <FaEye />
                      <span>Live Demo</span>
                    </a>
                    <a href={data.source} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                      <FaCode />
                      <span>View Code</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="content">
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                
                <div className="project-tech">
                  {data.technologies && data.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="buttons">
                  <a href={data.source} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <FaGithub />
                    Code
                  </a>
                  <a href={data.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="more-projects" data-aos="fade-up" data-aos-duration="1000">
          <p>Want to see more of my work?</p>
          <a href="https://github.com/rishav161" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaGithub />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Project;
