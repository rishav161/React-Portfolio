import  { useEffect, useRef} from 'react'
import resume from "../pdf/webResume.pdf"
import hero from "./data/hero.json"
import Typed from "typed.js";

const Home = () => {

  const typedRef=useRef(null)
  useEffect(()=>{
    const options={
      strings:["Wellcome to My Profile","My name is Rishav Jaiswal","I am a Software Developer"],
      typeSpeed:50,
      backSpeed:50,
      loop:true
    }
    const typed=new Typed(typedRef.current,options)
    return()=>{
      typed.destroy()
    }
  },[])

  return (
    <>
      <div className="container home " id='home'  
      >
        <div className="left"  data-aos="fade-up-left"
      data-aos-duration="1000">
          <h1 ref={typedRef}>
           Hey there.....👨🏻‍💻 
          </h1>
          <a href={resume} download="Resume.pdf" className="btn btn-outline-warning my-3">
            Resume 
          </a>
        </div>
        <div className="right"  
        data-aos="fade-up-right"
      data-aos-duration="1000">
          <div className="img">
            <img src={`/assets/Images/${hero.imgSrc}`} alt="image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home