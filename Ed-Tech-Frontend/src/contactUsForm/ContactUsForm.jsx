import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from "../data/countrycode.json";




export const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data) => {
            console.log("Logging of data", data);
            try {
                setLoading(true);
              //const response = await apiConnector("post", contactusEndpoint.CONTACT_US_API);
                const response = {status:"ok"}
                console.log("logging response", response);
                setLoading(false);
            } catch (error) {
                console.log("Error", error.message);
                setLoading(false);
            }
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
      
        <div className='flex flex-col gap-14'>
        <div className='flex gap-5'>
        <div className='flex flex-col'>
            <label htmlFor='firstname'>First Name</label>
            <input 
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Enter your first name'
                className='text-black'
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
                 className='text-black'
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
         {/* {email} */}
         <div className='flex flex-col'>
            <label htmlFor='email'>Email Address</label>
            <input 
                type='email'
                name='email'
                id='email'
                placeholder='Enter email Address'
                 className='text-black'
                {...register("email", {required:true} )}
            />
            {
                errors.email && (
                    <span>
                        Please enter your email address
                    </span>
                )
            }
        </div>
        {/* {phoneNo} */}
        <div className='flex flex-col gap-2'>
            
            <label htmlFor='phonenumber'>
                Phone Number
            </label>

            <div className='flex flex-row gap-5'>
                {/* {dropdown} */}
                <div>
                    <select
                        name='dropdown'
                        id='dropdown'
                        {...register("countrycode", {required:true})}
                    >
                        {
                            CountryCode.map( ( element, index ) => {
                                return (
                                    <option key={index} value={element.code}
                                    >
                                        {element.code} -{element.country}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <input
                        type='number'
                        name='phonenumber'
                        placeholder='Enter Phone number'
                        className='text-black'
                        {...register("phoneNo",
                         {
                            required:{value:true, message:"Please Enter Phone Number"},
                            maxLength: {value:10, message:"Invalid Phone Number"},
                            minLength: {value:8, message:"Invalid Phone Number"},
                            })}

                    />
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>

        </div>
         {/* {message} */}
         <div className='flex flex-col'>
            <label htmlFor='message'>Message</label>
            <textarea
                name='message'
                id='message'
                cols="30"
                rows="7"
                placeholder='Enter your message here'
                 className='text-black'
                {...register("message", {required:true} )}
            />
            {
                errors.message && (
                    <span>
                        Please enter your message.
                    </span>
                )
            }
        </div>
        <button type='submit'
        className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'>
            Send message
        </button>
        </div>

    </form>
  )
}
