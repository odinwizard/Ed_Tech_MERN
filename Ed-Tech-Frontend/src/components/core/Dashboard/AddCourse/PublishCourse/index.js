import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { IconBtn } from '../../../../common/IconBtn';




export const PublishCourse = () => {

    const {register, handleSubmit, setValue, getValues} = useForm();
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, [])

    const goBack = () => {
        dispatch(setStep(2));
    }
    
    const goToCourses = () => {
        dispatch(resetCourseState());
        //navigate("/dashboard/myCourses")
    }

    const handleCoursePublish = async () => {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || 
        (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
           //no updation in form
           //no need to make api call
            goToCourses();
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if(result) {
            goToCourses();
        }
        setLoading(false);

    }

    const onsubmit = (data) => {
        handleCoursePublish();
    }



  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onsubmit)}>

            <div>
                <label htmlFor='public'>
                   
                <input
                    type='checkbox'
                    id='public'
                    {...register("public")}
                    className='rounded h-4 w-4'
                />
                <span className='ml-3'>
                    Make this course as public 
                </span>
                
                </label>
            </div>

            <div className='flex justify-end gap-x-3 mt-4'>
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='flex items-center rounded-md bg-richblack-300 p-3'
                >Back</button>
                <IconBtn disabled={loading} text="Save Changes"/>
            </div>


        </form>



    </div>
  )
}
