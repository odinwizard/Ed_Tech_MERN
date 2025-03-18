import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { setLoading } from '../../../../../slices/profileSlice';
import { IconBtn } from '../../../../common/IconBtn';
import { NestedView } from './NestedView';


export const CourseBuilderForm = () => {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if(course.courseContent.length === 0) {
            toast.error("Please add atleast one section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        dispatch(setStep(3)); // if everything is good.
    }

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        console.log("data", data);
        if(editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )
        }   
        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }

         //update values
            if(result) {
                dispatch(setCourse(result));
                setEditSectionName(null);
                setValue("sectionName", "");
            }
  
            //loading false
            setLoading(false);

    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
         setValue("sectionName", sectionName);
    }


  return (
    <div className='text-white'>
        <p>Course Builder</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='sectionName'>Section name<sup>*</sup></label>
                <input
                    id='sectionName'
                    placeholder='Add section name'
                    {...register("sectionName", {required:true})}
                    className='w-full'
                />
                {errors.sectionName && (
                    <span>SectionName is required</span>
                )}
            </div>
            <div className='mt-10 flex w-full'>
                <IconBtn
                   type='Submit' 
                   text={editSectionName ? "Edit Section Name": "Create Section"}
                   outline={true}
                   customClasses={"text-white"}
                >
                <GrAddCircle />
                </IconBtn>
                {
                    editSectionName && (
                        <button
                            type='button'
                            onClick={cancelEdit}
                            className='text-sm text-richblack-300 underline'
                        >
                            Cancel edit
                        </button>
                    )
                }
            </div>
        </form>

        {course?.courseContent?.length > 0 && (
            <div>
                <p>{course?.courseContent?.courseName}</p>
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            </div>
        )}
        <div className='flex justify-end gap-x-3 mt-10'>
            <button 
            onClick={goBack}
            className='rounded-md cursor-pointer flex items-center'
            >
                Back
            </button>
            <IconBtn text="Next" onClick={goToNext}>
            <MdOutlineNavigateNext />
            </IconBtn>
        </div>
        

    </div>
  )
}
