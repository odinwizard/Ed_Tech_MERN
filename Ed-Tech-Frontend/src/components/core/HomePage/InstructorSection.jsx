import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Instructor from '../../../assets/Images/Instructor.png'
import CTAButton from '../HomePage/Button'
import { HighlightText } from './HighlightText'


export const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row items-center gap-20'>
            <div className='w-[50%]'>
                <img src={Instructor}
                    alt='InstructorImage'
                    className='shadow-white'
                />
            </div>
            <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold w-[50%] text-white'>
                    Become an
                    <HighlightText text={"instructor"}/>
                </div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                   <div className='flex flex-row gap-2 items-center'>
                     Start Teaching Today
                     <FaArrowRight/>
                   </div>                   
                </CTAButton>
                </div>
               

            </div>
        </div>
    </div>
  )
}
