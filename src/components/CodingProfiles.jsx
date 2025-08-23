import { motion } from 'framer-motion'
import { FaCode, FaTrophy, FaExternalLinkAlt } from 'react-icons/fa'

const CodingProfiles = () => {
  const profiles = [
    {
      id: 1,
      name: "LeetCode",
      url: "https://leetcode.com/u/Rishav16/",
      icon: "https://leetcode.com/favicon-32x32.png",
      description: "Problem solving and algorithm challenges",
      stats: "solving problems"
    },
    {
      id: 2,
      name: "HackerRank",
      url: "https://www.hackerrank.com/profile/rishavjaiswal864",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      
      description: "Coding competitions and skill assessments",
      stats: "4* in pyhton and c"
    }
  ]

  return (
    <section className="coding-profiles" id="coding-profiles">
      <div className="container">
        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
          <h1>Coding Profiles</h1>
          <p>My competitive programming and problem-solving journey</p>
        </div>
        
        <div className="profiles-grid">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              className="profile-card"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 200}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="profile-header">
                <div className="profile-icon">
                  <img src={profile.icon} alt={profile.name} />
                </div>
                <div className="profile-info">
                  <h3>{profile.name}</h3>
                  <p>{profile.description}</p>
                </div>
              </div>
              
              <div className="profile-stats">
                <FaTrophy className="trophy-icon" />
                <span>{profile.stats}</span>
              </div>
              
              <motion.a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt />
                Visit Profile
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CodingProfiles
