import React from 'react'
import timelineImage from "../../../assets/Images/TimelineImage.png"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description:"Code your way to a solution"
    },
]

export const TimelineSection = () => {
  return (
    <div>
         <div className='flex flex-row items-center gap-14'>
            <div className='w-[45%] flex flex-col gap-10'>
                {
                    timeline.map( (element, index) => {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                <div className='w-[50px] h-[50px] bg-white rounded-full  flex justify-center items-center'>
                                    <img src={element.Logo} />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                       )
                    })
                }
            </div>
            <div className='relative shadow-blue-200'>
                <img src={timelineImage}
                    alt='"timelineImage'
                    className='shadow-white object-cover h-fit'
                />

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-200 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>
                    </div>
                </div>

            </div>

         </div>
    </div>
  )
}
