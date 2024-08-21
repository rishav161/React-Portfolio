import React from 'react'
import skills from './data/skills.json'

const Skill = () => {
  return (
    <>
      <div className="container skills" id='skills'>
        <h1>SKILLS</h1>
        <div className="items" >
        {skills.map((data)=>(
          <>
            
              <div className='item' key={data.id} 
               data-aos="fade-down-left"
               data-aos-duration="1000">
                  <img src={`/assets/Images/${data.imageSrc}`} alt="" />
                  <h3>{data.title}</h3>
              </div>
          </>
        ))}
        </div>
      </div>
    </>
  )
}

export default Skill