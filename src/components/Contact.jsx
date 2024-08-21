import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
  return(
    <>
      <div className="container contact" id='contact'>
        <h1>CONTACT ME</h1>
        <div className='contact-icon' data-aos="zoom-in-up"
      data-aos-duration="1000">
          <a href="https://www.linkedin.com/in/rishav-jaiswal-55141824a/" target="_blank" className="items"><FaLinkedin className='icons'/></a>
          <a href="https://github.com/rishav161" target="_blank" className="items"><FaGithubSquare className='icons'/>
          </a>
          <a href="mailto:rishavjaiswal864@gmail.com" target="_blank" className="items"><IoIosMail className='icons'/>
          </a>
          {/* <div className="items"></div>
          <div className="items"></div> */}
        </div>
      </div>
    </>
  )
}

export default Contact