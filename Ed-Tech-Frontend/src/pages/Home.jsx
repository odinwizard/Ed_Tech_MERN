
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Banner from '../assets/Images/banner.mp4';
import Footer from '../components/common/Footer';
import CTAButton from "../components/core/HomePage/Button";
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';
import { HighlightText } from '../components/core/HomePage/HighlightText';
import { InstructorSection } from '../components/core/HomePage/InstructorSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import { TimelineSection } from '../components/core/HomePage/TimelineSection';



const Home = () => {
  return (
    <div>
        {/*Section1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between'>

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-0 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>
            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                 With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
            <div className='mx-3 my-12 shadow-blue-200'>
                <video
                muted
                loop
                autoPlay
                >
                <source src={Banner} type="video/mp4"/>
                </video>
            </div>

            <div>
                <CodeBlocks
                    position={"lg: flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={"coding potential"}/>
                            with our online courses
                        </div>
                    }
                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "learn more",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                />
            </div>

            <div>
                <CodeBlocks
                    position={"lg: flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"coding in seconds"}/>
                             
                        </div>
                    }
                    subHeading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "learn more",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                />
            </div>
                    <ExploreMore/>

        </div>
        {/*Section2 */}
                    <div className='bg-pure-greys-5 text-richblack-700'>
                        <div className='homepage_bg h-[310px]'>

                            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                                <div className='h-[150px]'></div>
                                <div className='flex flex-row gap-7 text-white'>
                                    <CTAButton active={true} linkto={"/signup"}>
                                        <div className='flex items-center gap-3'>
                                            Explore Full Catalog
                                            <FaArrowRight/>
                                        </div>
                                    </CTAButton>
                                    <CTAButton active={false} linkto={"/signup"}>
                                        <div>
                                            Learn more
                                        </div>
                                    </CTAButton>
                                </div>
                            </div>

                        </div>
                        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5'>
                            <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                                <div className='text-4xl font-semibold w-[45%]'>
                                    Get the skill you need for about a
                                    <HighlightText text={"Job that is in demand"}/>
                                </div>
                                <div className='flex flex-col gap-10 w-[40%] items-start'>
                                    <div className='text-[16px]'>
                                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                    </div>
                                    <CTAButton active={true} linkto={"/signup"}>
                                        <div>
                                            learn more
                                        </div>
                                    </CTAButton>
                                </div>
                            </div>

                            <TimelineSection/>

                            <LearningLanguageSection/>
                            
                        </div>
                       
                    </div>
        {/*Section3 */}
                    <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                            
                            <InstructorSection />
                            
                            <h2 className='text-center text-4xl font-semibold mt-8 '>Review from other learner</h2>
                            {/*Reviews slider here*/}
                            {/* <ReviewSlider/> */}
                    </div> 
        {/*Footer */}
        <Footer/>
    </div>
  )
}

export default Home;


