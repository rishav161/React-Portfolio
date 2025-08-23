import { FaLinkedin, FaGithubSquare, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact" id='contact'>
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Get In Touch</h1>
          <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info" data-aos="fade-up" data-aos-duration="1000">
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>rishavjaiswal864@gmail.com</p>
                <a href="mailto:rishavjaiswal864@gmail.com" className="contact-link">Send Email</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>Bhubaneswar, Odisha, India</p>
                <span className="contact-link">Available for remote work</span>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <FaGithubSquare />
              </div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <p>@rishav161</p>
                <a href="https://github.com/rishav161" target="_blank" rel="noopener noreferrer" className="contact-link">View Profile</a>
              </div>
            </div>
          </div>
          
          <div className="social-links-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <h3>Connect With Me</h3>
            <div className='contact-icon'>
              <a href="https://www.linkedin.com/in/rishav-jaiswal-55141824a/" target="_blank" rel="noopener noreferrer" className="items">
                <FaLinkedin className='icons'/>
              </a>
              <a href="https://github.com/rishav161" target="_blank" rel="noopener noreferrer" className="items">
                <FaGithubSquare className='icons'/>
              </a>
              <a href="mailto:rishavjaiswal864@gmail.com" className="items">
                <FaEnvelope className='icons'/>
              </a>
            </div>
          </div>
        </div>
        
        <div className="contact-cta" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <h3>Let's Work Together</h3>
          <p>I'm currently available for freelance opportunities and full-time positions. Let's discuss how I can help bring your ideas to life!</p>
          <div className="cta-buttons">
            <a href="mailto:rishavjaiswal864@gmail.com" className="btn btn-primary">
              <FaEnvelope />
              Start a Conversation
            </a>
            <a href="https://github.com/rishav161" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <FaGithubSquare />
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact