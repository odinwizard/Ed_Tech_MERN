import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrAddCircle } from "react-icons/gr";
import { IconBtn } from '../../../../common/IconBtn';


export const CourseBuilderForm = () => {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSectionName, setEditSectionName] = useState(null);

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }


  return (
    <div className='text-white'>
        <p>Course Builder</p>

        <form>
            <div>
                <label>Section name<sup>*</sup></label>
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
            <div className='mt-10'>
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

        

    </div>
  )
}
