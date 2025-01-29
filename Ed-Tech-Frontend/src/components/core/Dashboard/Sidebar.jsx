import React from 'react';
import { useSelector } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import { SidebarLink } from './SidebarLink';




export const Sidebar = () => {

  const {user, loading: profileLoading} = useSelector((state) => state.profile);
  const {loading:authLoading} = useSelector((state) => state.auth);

  if(profileLoading || authLoading) {
    return (
        <div className='mt-28'>
            loading...
        </div>
    )
}

  return (
    <div>

          <div className='flex min-w-[22px] flex-col border-r-[1px] border-r-richblack-700
                h-[calc(100vh-3)] bg-richblack-800 py-10'>
              <div className='flex flex-col'>
                  {
                    sidebarLinks.map( (link) => {
                     if(link.type && user?.accountType !== link.type) return null;
                     return (
                      <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                     )
                    })
                  }
              </div>

              <div className='mx-auto mt-6 mb-6 h-[1px ]  w-10/12 bg-richblack-600'></div>

              <div className='flex flex-col'>
                  <SidebarLink
                   link={{name:"Settings",path:"dashboard/settings"}} 
                   iconName=" VscSettingsGear"
                   />   
                  <button
                  onClick={() => {
                    // text1:"Are you sure ?"
                    // // text2:
                  }}
                  ></button>
              </div>

          </div>


    </div>
  )

}
