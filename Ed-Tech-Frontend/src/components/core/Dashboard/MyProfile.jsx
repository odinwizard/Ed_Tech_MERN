import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconBtn } from '../../common/IconBtn';

export const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='text-white'>
        <h1>
            My Profile
        </h1>
        {/* {Section:1} */}
        <div>
            <div>
                <img src= {user?.image}
                alt={`profile-${user?.firstName}`} 
                className='aspect-square w-[78px] rounded-full object-cover'
                 />
               <div>
                    <p> {user?.firstName + " " + user?.lastName}</p>
                    <p> {user?.email}</p>
               </div>
            </div>
            <IconBtn
                text="Edit"
                onClick={ () => {
                    navigate("/dashboard/settings")
                }}>

                </IconBtn>
        </div>
        {/* {Section:2} */}
        <div>
          <div>
            <p>About</p>
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            />
          </div>
          <p>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
        </div>
        {/* {Section:3} */}
        <div>
          <div>
            <p>Personal Details</p>
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings")
              }}
            />
          </div>
          <div>
            <p>FirstName</p>
            <p>{user?.firstName}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>{user?.additionalDetails?.gender}</p>
          </div>
          <div>
            <p>LastName</p>
            <p>{user?.lastname}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
          </div>
          <div>
            <p>Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? "Add date of Birth"}</p>
          </div>
        </div>

    </div>
  )
}
