import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci"
import { useSelector } from 'react-redux'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { categories } from '../../services/api'
import { apiConnector } from '../../services/apiconnector'
import { ProfileDropDown } from "../core/Auth/ProfileDropDown"




export const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const [subLinks,setSubLinks] = useState([]);

    const fetchSublinks  =  async() => {
        try {
            const result = await apiConnector( "GET", categories.CATEGORY_API);
            console.log("Printing Sublinks result:", result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list")
        }
    }
    useEffect( () => {
        fetchSublinks();
    },[])




    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        <Link to="/">
            <img src={logo} alt='logoImage' width={160} height={32}/>
        </Link>

        <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? (
                                    <div>
                                        <p>{link.title}</p>
                                    </div>
                                    ) :
                                
                                 (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                         {link.title}
                                        </p>
                                        
                                    </Link>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
        {/* login/signup/dashboard */}
        <div className='flex gap-x-4 items-center'>
                
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <CiShoppingCart />
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richbalck-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md
                            '>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richbalck-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md
                            '>
                                Sign up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
        </div>

        </div>
    </div>
    
  )
}
