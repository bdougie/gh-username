import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSun, faMoon  } from '@fortawesome/free-solid-svg-icons'
import {  faGithub } from "@fortawesome/free-brands-svg-icons"
import { useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'
import CountUp from 'react-countup';




{/* <Head>
  <title>Github User Number</title>
  <meta name="description" content="This is the coolest way to know how earlier has a user signed up on GitHub" />
  
</Head> */}

export default function Home() {

  useEffect(() => {
    initTheme();

    setTimeout(() => {
      setshowLoader(false);
      
    }, 2000);
  }, [])
  

  const [dark, setDark] = useState(false);
  const [databaseId, setdatabaseId] = useState(null)
  const [showLoader, setshowLoader] = useState(true)

    const initTheme = () => {
        if(localStorage.getItem("dark") == null ){
            localStorage.setItem("dark", "false");
        }
        if(localStorage.getItem("dark") == "true"){
            setDark(true)
        }  
    }
    
    const switchTheme = () => {
        setDark(!dark)
        if(localStorage.getItem("dark") == "false"){
                localStorage.setItem("dark", "true")
            }
        else{
                localStorage.setItem("dark", "false")
        }
        
    }


    const onSubmissionHandler = (e) => {
      e.preventDefault()
      setdatabaseId(null)
      setshowLoader(true)
      setTimeout(() => {
        setshowLoader(false);
        setdatabaseId(54499)
        
        
      }, 1500);


    }

  return (
    <div className={` ${ dark ? " dark " : "" } `} >
      {/* Main container */}
      <div className=' bg-bgGray h-screen dark:bg-gray-900 font-inter p-[15px] md:px-[25px] '  >

          {/* top part */}
          <div className=' flex justify-between mt-[15px] ' >
            {/* branding */}
              <motion.div
              transition={{ duration: [0.5], delay:2.3 }}
              initial={  { opacity:0} }
              animate={{ opacity:1 }}
              className=' flex items-center w-[150px]   '>
                  <div className=' flex items-center justify-center  bg-gray-200 dark:bg-gray-300 p-[7px] rounded-[5px] mr-[7px] '>
                    <FontAwesomeIcon className=' text-[22px]  '  icon={faGithub} />
                    
                  </div>
                  <div className='flex justify-center leading-none  flex-col '>
                    <h6 className=' text-gray-800 text-[23px] font-bold dark:text-gray-400 ' >GitHub</h6>
                    <h6 className=' text-[12px] font-bold text-green '>User Number</h6>
                  </div>
                </motion.div>

                <motion.div
                transition={{ duration: [0.5], delay:2.3 }}
                initial={  { opacity:0} }
                animate={{ opacity:1 }}
                onClick={switchTheme} className=' mr-[10px] bg-green w-6 h-6 rounded-3xl flex items-center justify-center p-[15px] cursor-pointer '>
                  {dark ? <FontAwesomeIcon icon={faSun} className='text-white  ' /> : <FontAwesomeIcon icon={faMoon} className='text-white  ' />}
                  <div className=' '></div>
                </motion.div>
          </div>
          {/* End branding */}

          <main>
            {/* Heading */}
            <div className=' flex  justify-center mt-[80px] md:mt-[120px]  ' >
              <div className=' flex flex-col' >
                <motion.h1
                transition={{ duration: [2.5] }}
                initial={  { opacity:0}}
                animate={{ y:[220, 200,200,200, 200, 0], opacity:[0,1,1,1,1,1] }}
                className=' text-[2rem]  md:text-[50px] font-semibold md:font-bold text-green ' >How earlier have you been on <span className=' text-gray-800 dark:text-gray-400 '>GitHub?</span></motion.h1>
                <motion.h1
                transition={{ duration: [3.5], delay:2.5 }}
                initial={  { opacity:0} }
                animate={{ scale:[1,1.02,1, 1.02,1,1.02,1],  originX:0, originY:0, opacity:[0,1,1,1,1,1] }}
                className=' text-[2rem]  md:text-[50px] font-semibold md:font-bold text-gray-800 dark:text-gray-400  '>Find now
                </motion.h1>

              </div>
            </div>

            
            {/* end heading */}

            {/* Form */}
            <div className=' flex max-w-[100] justify-center mt-[65px]' >
              <div className=' w-[920px]  '>
                <motion.h6
                transition={{ duration: [0.5], delay:2.5 }}
                initial={  { opacity:0} }
                animate={{ opacity:1 }}
                className=' text-[2rempx] font-bold text-gray-500 mb-[5px] dark:text-gray-400  ' > Github username</motion.h6>
                <motion.form
                
                transition={{ duration: [0.5], delay:2.8 }}
                initial={  { opacity:0} }
                animate={{ opacity:1 }}
                className=' flex '  >
                    <input type="text" className=' bg-gray-200 text-gray-500 outline-green rounded-[4px] mr-[10px]  pl-[8px] pr-[8px] pt-[5px] pb-[5px] ' />
                    <div onClick={onSubmissionHandler} className=' flex justify-center items-center bg-green text-[1.5] cursor-pointer hover:bg-gray-600 transition duration-500 ease-in-out md:text-[20px]  pl-[8px] pr-[8px] pt-[2px] pb-[2px] font-bold text-white rounded-[4px]' >
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[16px]" />
                      <button type='submit' className=' ml-[5px] font-semibold cursor-pointer ' >Find</button>
                    </div>
                </motion.form>
              </div>
            </div>
            {/* End form */}

            {/* user number */}
            <div className=' flex justify-center mt-[40px] md:mt-[100px] '>
              {
                showLoader && <Loader/>
              }
              
              {
              databaseId ? <h1 className=' text-gray-800 md:text-[30px] text-[1.5rem] font-semibold md:font-bold dark:text-gray-400   '>{<CountUp duration={1} end={databaseId} />}<span className=' text-green' >'th</span> </h1> : null
              }
              
            </div>
          </main>
      </div>
    </div>
  )
}
