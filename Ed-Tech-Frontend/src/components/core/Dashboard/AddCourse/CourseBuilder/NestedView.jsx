import React, { useState } from 'react';
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';




export const NestedView = () => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    



  return (
    <div >

       <div>
            {course?.courseContent?.map((section) => (
                <details key={section._id} open>
                    {console.log("section", section)}
                    <summary className='flex items-center justify-between gap-3 border-b-2'>
                        <RxDropdownMenu/>
                        <p>{section.sectionName}</p>
                    </summary>
                </details>
            )      
            )}
       </div>


    </div>
  )
}


