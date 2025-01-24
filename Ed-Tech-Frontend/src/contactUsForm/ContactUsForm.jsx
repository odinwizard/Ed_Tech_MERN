import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data) => {

    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] )

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>


        <div className='flex gap-5'>
        <div className='flex flex-col'>
            <label htmlFor='firstname'>First Name</label>
            <input 
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Enter your first name'
                {...register("firstname", {required:true} )}
            />
            {
                errors.firstname && (
                    <span>
                        please enter your firstname
                    </span>
                )
            }
        </div>
        <div className='flex flex-col'>
            <label htmlFor='lastname'>Last Name</label>
            <input 
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Enter your Last name'
                {...register("lastname", {required:true} )}
            />
            {
                errors.lastname && (
                    <span>
                        please enter your lastname
                    </span>
                )
            }
        </div>
       
        </div>
        


    </form>
  )
}
