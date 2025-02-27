import React, { useState } from 'react';

export const RequirementField = ({name, label, register, errors, setValue, getValues}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
           // setValue(name, [...requirementList, requirements]);
            setRequirement("");
        }
    }
    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index, 1);
        setRequirementList(updateRequirementList);
    }
  return (
    <div>
        
        <label>{label}<sup>*</sup></label>
            <div>
                <input
                    type='text'
                    id={requirement}
                />
            </div>
    </div>
  )
}
