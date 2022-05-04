import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import { Auth } from 'netlify-graph-auth';
import NetlifyGraphAuth = Auth.NetlifyGraphAuth;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSun, faMoon  } from '@fortawesome/free-solid-svg-icons'
import {  faGithub } from "@fortawesome/free-brands-svg-icons"
import { motion } from 'framer-motion'
import Loader from '../components/Loader'
import CountUp from 'react-countup';



export default function Form(props) {
  const isServer = typeof window === "undefined";
  const [formVariables, setFormVariables] = React.useState({});
  const [result, setResult] = useState(null);
  const [showAuthorizationMsg, setshowAuthorizationMsg] = useState(false)

  useEffect(() => {
    initTheme();

    setTimeout(() => {
      setshowLoader(false);
      
    }, 2000);
  }, [])
  

  const [dark, setDark] = useState(false);
  const [showId, setShowId] = useState(false)
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
      if(needsLoginService){
          setshowAuthorizationMsg(true);
          return;
      }
      submitForm(e)


      setShowId(false)
      setshowLoader(true)
      setTimeout(() => {
        setshowLoader(false);
        setShowId(true)

        //console.log( result && result.data && result.data.gitHub && result.data.gitHub.user.databaseId == undefined )
        
      }, 1000);


    }

  const [auth, setAuth] = useState(
    isServer
      ? null
      : new NetlifyGraphAuth({
          siteId: props.siteId,
        })
  );

  const needsLoginService = auth?.findMissingAuthServices(result)[0];
  const submitForm = async (event) => {
    console.log(formVariables);
    
    const res = await fetch("/api/FindGitHubUserIdForReal", {
      body: JSON.stringify(formVariables),
      headers: {
        "Content-Type": "application/json",
        ...auth?.authHeaders()
      },
      method: "POST"
    });

    const formResult = await res.json();
    setResult(formResult);
  };

  const authorize = async(e)=>{
    setshowAuthorizationMsg(false)
    e.preventDefault();
    await auth.login(needsLoginService);
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
                        <input
                        id="login" onChange={updateFormVariables(setFormVariables, ["login"], (value) => value)} 
                        type="text" className=' bg-gray-200 text-gray-500 outline-green rounded-[4px] mr-[10px]  pl-[8px] pr-[8px] pt-[5px] pb-[5px] ' />
                        <div onClick={onSubmissionHandler} className=' flex justify-center items-center bg-green text-[1.5] cursor-pointer hover:bg-gray-600 transition duration-500 ease-in-out md:text-[20px]  pl-[8px] pr-[8px] pt-[2px] pb-[2px] font-bold text-white rounded-[4px]' >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[16px]" />
                            <button type='submit' className=' ml-[5px] font-semibold cursor-pointer ' >Find</button>
                        </div>
                        {
                            needsLoginService ? (
                                <div onClick={authorize} className=' flex justify-center items-center bg-gray-600 text-[1.5] cursor-pointer hover:bg-gray-600 transition duration-500 ease-in-out md:text-[20px] ml-[5px]  pl-[8px] pr-[8px] pt-[2px] pb-[2px] font-bold text-white rounded-[4px]' >
                                    <FontAwesomeIcon icon={faGithub} className="text-[16px] text-gray-100 " />
                                    <button onClick={authorize}  className=' ml-[5px]  cursor-pointer ' >Authorize</button>
                                </div>
                            ) : null
                        }
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
                showId ?(
                    result && result.data && result.data.gitHub && result.data.gitHub.user.databaseId ? <h1 className=' text-gray-800 md:text-[30px] text-[1.5rem] font-semibold md:font-bold dark:text-gray-400   '>{<CountUp duration={1} end={result.data.gitHub.user.databaseId} />}<span className=' text-green' >'th</span> </h1> : (needsLoginService ? <h1>Please authorize with GitHub first!</h1> : <h1 >Nothing found</h1> )
                    
                ) : null
                }
                
            </div>
            
            </main>
        </div>
        </div>

  )
}

export async function getServerSideProps(context) {
  const siteId = process.env.SITE_ID;
  if (!siteId) {
    throw new Error("SITE_ID environment variable is not set. Be sure to run `netlify link` before `netlify dev`");
  }

  return {
    props: {
      title: "FindGitHubUserIdForReal form",
      siteId: siteId
    }
  }
}

const updateFormVariables = (setFormVariables, path, coerce) => {
  const setIn = (object, path, value) => {
    if (path.length === 1) {
      if (value === null) {
        delete object[path[0]];
      } else {
        object[path[0]] = value;
      }
    } else {
      if ([undefined, null].indexOf(object[path[0]]) > -1) {
        object[path[0]] = typeof path[1] === "number" ?  [] : {};
      }
      setIn(object[path[0]], path.slice(1), value);
    }
    return object;
  };

  const formInputHandler = (event) => {
    // We parse the form input, coerce it to the correct type, and then update the form variables
    const rawValue = event.target.value;
    // We take a blank input to mean `null`
    const value = rawValue === "" ? null : rawValue;
    setFormVariables((oldFormVariables) => {
      const newValue = setIn(oldFormVariables, path, coerce(value));
      return { ...newValue };
    });
  };

  return formInputHandler;
};
