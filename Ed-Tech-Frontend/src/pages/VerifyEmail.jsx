import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
export const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector( (state) => state.auth);

    useEffect( () => {
        if (!signupData) {
            navigate("/signup");
        }
    },[signupData, navigate])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            

        } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }


  return (
    <div className=' text-white'>
    
    {
        loading
        ? (<div>
            Loading...
        </div>)
        : (
            <div>
                <h1>Verify email</h1>
                <p>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handleOnSubmit} >
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} 
                        className=' bg-richblue-600 text-white'
                        />}
                    />
                    <button type='submit'>
                        Verify Email
                    </button>
                </form>
                <div>
                <div>
                    <Link to="/login">
                        <p>Back to login</p>
                    </Link>
                </div>
                <button 
                onClick={() => dispatch(sendOtp(signupData.email))}
                >
                    Resend it
                </button>
                </div>
            </div>
        )
    }
    
    </div>
  )
}
