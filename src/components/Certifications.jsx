import certifications from "./data/certifications.json"
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'

const Certifications = () => {
  return (
    <section className="certifications" id="certifications">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Certifications</h1>
          <p>Professional certifications and courses that validate my skills and knowledge</p>
        </div>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="certification-card"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 200}
            >
              <div className="cert-icon">
                <FaCertificate />
              </div>
              
              <div className="cert-content">
                <h3>{cert.title}</h3>
                <div className="cert-meta">
                  <span className="issuer">{cert.issuer}</span>
                  <span className="date">{cert.date}</span>
                </div>
                <p>{cert.description}</p>
                
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cert-link"
                >
                  <FaExternalLinkAlt />
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
