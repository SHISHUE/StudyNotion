import React from 'react'
import Logo from '../../assest/logo/Logo.svg'
import Ancore from '../core/Footer/Ancore'
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
function Footer() {
  return (
    <div className='w-full flex flex-col bg-[#161d29] mx-auto py-[32px] mt-[62px]'>
      <div className='w-11/12 max-w-maxContent bg-[#161d29] flex mx-auto gap-5'>
        {/* Left side div  */}
        <div className='flex flex-row gap-5 w-[50%] border-r-[1px] border-richblack-700 pr-[12px] mx-auto'>
          <div className='flex flex-col gap-3 w-[33%]'>
            {/* logo */}
            <img src={Logo} alt="studyNotion-logo"/>
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Company</h1>
            <Ancore text={"About"} path={"/"}/>
            <Ancore text={"Careers"} path={"/"}/>
            <Ancore text={"Affiliates"} path={"/"}/>

            <div className='flex flex-row gap-3'>
              <FaFacebook className='text-richblack-300 hover:text-[#669eff] transition-all duration-200'/>
              <FaTwitter className='text-richblack-300 hover:text-[#7366ff] transition-all duration-200'/>
              <AiFillGoogleCircle className='text-richblack-300 hover:text-[#b06f4c] transition-all duration-200'/>
              <FaYoutube className='text-richblack-300 hover:text-[#874141] transition-all duration-200'/>
            </div>
          </div>
          <div className='flex flex-col gap-1 w-[33%]'>
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Resources</h1>
            <Ancore text={'Articles'} path={'/'}/>
            <Ancore text={"Blog"} path={'/'}/>
            <Ancore text={"Chart Sheet"} path={'/'}/>
            <Ancore text={"Code challenges"} path={'/'}/>
            <Ancore text={"Docs"} path={'/'}/>
            <Ancore text={"Projects"} path={'/'}/>
            <Ancore text={"Videos"} path={'/'}/>
            <Ancore text={"Workspaces"} path={'/'}/>
            <div className='mt-10 flex flex-col gap-3'>
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Support</h1>
            <Ancore text={"Help Center"} path={'/'}/>
            </div>
          </div>
          <div className='flex flex-col gap-8 w-[33%]'>

          <div className='flex flex-col gap-2'>
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Plans</h1>
            <Ancore text={'Paid memberships'} path={'/'}/>
            <Ancore text={'For students'} path={'/'}/>
            <Ancore text={'Business solutions'} path={'/'}/>
          </div>

          <div className='flex flex-col gap-1'>
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Community</h1>
            <Ancore text={'Forums'} path={'/'}/>
            <Ancore text={'Chapters'} path={'/'}/>
            <Ancore text={'Events'} path={'/'}/>
          </div>
          </div>
        </div>

        {/* Right side div  */}
        <div className='flex flex-row gap-5 w-[50%]'>
            <div className='flex flex-col gap-1 w-[40%]'>
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Subjects</h1>
            <Ancore text={"AI"} path={'/'}/>
            <Ancore text={"Cloud Computing"} path={'/'}/>
            <Ancore text={"Code Foundations"} path={'/'}/>
            <Ancore text={"Computer Science"} path={'/'}/>
            <Ancore text={"Cybersecurity"} path={'/'}/>
            <Ancore text={"Data Analytics"} path={'/'}/>
            <Ancore text={"Data Science"} path={'/'}/>
            <Ancore text={"Data Visualization"} path={'/'}/>
            <Ancore text={"Developer Tools"} path={'/'}/>
            <Ancore text={"DevOps"} path={'/'}/>
            <Ancore text={"Game Development"} path={'/'}/>
            <Ancore text={"IT"} path={'/'}/>
            <Ancore text={"Machine Learning"} path={'/'}/>
            <Ancore text={"Math"} path={'/'}/>
            <Ancore text={"Mobile Development"} path={'/'}/>
            <Ancore text={"Web Design"} path={'/'}/>
            <Ancore text={"Web Development"} path={'/'}/>
            </div>
            
            <div className='flex flex-col gap-1 w-[33%] '>
          
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Languages</h1>
            <Ancore text={"Bash"} path={'/'}/>
            <Ancore text={"C"} path={'/'}/>
            <Ancore text={"C++"} path={'/'}/>
            <Ancore text={"C#"} path={'/'}/>
            <Ancore text={"GO"} path={'/'}/>
            <Ancore text={"HTML & CSS"} path={'/'}/>
            <Ancore text={"Java"} path={'/'}/>
            <Ancore text={"JavaScript"} path={'/'}/>
            <Ancore text={"Kotlin"} path={'/'}/>
            <Ancore text={"PHP"} path={'/'}/>
            <Ancore text={"Python"} path={'/'}/>
            <Ancore text={"R"} path={'/'}/>
            <Ancore text={"Ruby"} path={'/'}/>
            <Ancore text={"SQL"} path={'/'}/>
            <Ancore text={"Swift"} path={'/'}/>
            
            </div>

            <div className='flex flex-col w-[33%] gap-1'>
            <h1 className='text-[#a1a4b1] font-semibold text-[16px]'>Career building</h1>
            <Ancore text={"Career paths"} path={'/'}/>
            <Ancore text={"Career services"} path={'/'}/>
            <Ancore text={"Interview prep"} path={'/'}/>
            <Ancore text={"Professional certification"} path={'/'}/>
            <Ancore text={"-"} path={'/'}/>
            <Ancore text={"Full Catalog"} path={'/'}/>
            <Ancore text={"Beta Content"} path={'/'}/>
           
            </div>
        </div>


      </div>

      <div className='border-richblack-700 border-t-[1px] flex flex-between items-center justify-between pt-[28px] mx-auto mt-[28px] px-[35px] w-11/12'>
        <div className='flex gap-2'>
          <a href="/" className='text-[14px] text-richblack-200 border-r-[1px] border-richblack-300 pr-2'>Privacy Policy</a>
          <a href="/" className='text-[14px] text-richblack-200 border-r-[1px] border-richblack-300 pr-2'>Cookie Policy</a>
          <a href="/" className='text-[14px] text-richblack-200 '>Terms</a>
        </div>
        <div>
          <p className='text-[14px] text-richblack-200'>
          Made with ❤️ Akshu © 2023 Studynotion
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer