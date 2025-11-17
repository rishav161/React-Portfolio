import { FaLinkedin, FaGithubSquare, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from 'framer-motion'

const Contact = () => {
  const contactItems = [
    {
      icon: FaEnvelope,
      title: "Email",
      content: "rishavjaiswal864@gmail.com",
      link: "mailto:rishavjaiswal864@gmail.com",
      linkText: "Send Email"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: "Bhubaneswar, Odisha, India",
      linkText: "Available for remote work",
      noLink: true
    },
    {
      icon: FaGithubSquare,
      title: "GitHub",
      content: "@rishav161",
      link: "https://github.com/rishav161",
      linkText: "View Profile"
    }
  ]

  return (
    <section className="contact" id='contact'>
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Get In Touch</h1>
          <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info" data-aos="fade-up" data-aos-duration="1000">
            {contactItems.map((item, index) => (
              <motion.div 
                key={item.title}
                className="contact-item"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="contact-icon-wrapper">
                  <item.icon />
                </div>
                <div className="contact-details">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  {item.noLink ? (
                    <span className="contact-link">{item.linkText}</span>
                  ) : (
                    <a href={item.link} target={item.link.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer" className="contact-link">
                      {item.linkText}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="social-links-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <h3>Connect With Me</h3>
            <div className='contact-icon'>
              <motion.a 
                href="https://www.linkedin.com/in/rishav-jaiswal-55141824a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="items"
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin className='icons'/>
              </motion.a>
              <motion.a 
                href="https://github.com/rishav161" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="items"
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithubSquare className='icons'/>
              </motion.a>
              <motion.a 
                href="mailto:rishavjaiswal864@gmail.com" 
                className="items"
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className='icons'/>
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="contact-cta" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <h3>Let's Work Together</h3>
          <p>I'm currently available for freelance opportunities and full-time positions. Let's discuss how I can help bring your ideas to life!</p>
          <div className="cta-buttons">
            <motion.a 
              href="mailto:rishavjaiswal864@gmail.com" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
              Start a Conversation
            </motion.a>
            <motion.a 
              href="https://github.com/rishav161" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithubSquare />
              View My Work
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact