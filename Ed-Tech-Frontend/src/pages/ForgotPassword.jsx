import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authApi';


export const ForgotPassword = () => {

    const [emailSend, setEmailSend] = useState(false);
    const [email, setEmail] = useState("");



    const {loading} = useSelector( (state) => state.auth)
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSend));
    }

  return (
    <div className='text-white flex justify-center items-center'>
    {
        loading ? (
            <div>Loading ...</div>
        ) : (
            <div>
                <h1>
                    {
                        !emailSend ? "Reset Your Password" : "Check Your Email"
                    }
                </h1>
                <p>
                    {
                        !emailSend ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                        `We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSend && (
                            <label>
                                <p>Email Address</p>
                                <input 
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email address'
                                 />
                            </label>
                        )
                    }
                    <button type='submit'>
                        {
                            !emailSend ? "Reset Password" : "Resend Email"
                        }
                    </button>
                </form>
                <div>
                    <Link to="/login">
                        <p>Back to login</p>
                    </Link>
                </div>
            </div>
        )
    }
    </div>
  )
}

