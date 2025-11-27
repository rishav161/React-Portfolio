import { useState } from 'react'
import { FaLinkedin, FaGithubSquare, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

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

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Using EmailJS (you'll need to sign up at emailjs.com and get your keys)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          template_id: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          user_id: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'rishavjaiswal864@gmail.com'
          }
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact" id='contact'>
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Get In Touch</h1>
          <p>I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology</p>
        </div>
        
        <div className="contact-content">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-container" 
            data-aos="fade-up" 
            data-aos-duration="1000"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner-small"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    className="submit-message success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaCheckCircle />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    className="submit-message error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaExclamationCircle />
                    <span>Failed to send message. Please try again or email me directly.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
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