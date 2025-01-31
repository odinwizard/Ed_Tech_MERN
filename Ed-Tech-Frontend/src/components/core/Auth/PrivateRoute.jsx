import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const PrivateRoute = ({Children}) => {

    const {token} = useSelector( (state) => state.auth);

    if(token !== null) 
        return Children
    else 
        return <Navigate to="/login" />

}
