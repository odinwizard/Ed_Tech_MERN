import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { categories } from "../../services/api";
import { apiConnector } from "../../services/apiconnector";
import { ProfileDropDown } from "../core/Auth/ProfileDropDown";

// const subLinks = [
//     {
//         title: "python",
//         link: "/catalog/python"
//     },
//     {
//         title: "web dev",
//         link: "/catalog/web-developmnt"
//     },
// ]

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);

  const fetchsubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing subLinks result:", result);
      setSubLinks(result.data.allCategory);
      //console.log(result.data.allCategory);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };
  useEffect(() => {
    console.log("Current Route:", window.location.pathname);
    fetchsubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="logoImage"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-1 group">
                    <p>{link.title}</p>
                    <IoIosArrowDown />

                    <div
                      className="invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                     top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblue-900
                                    opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]
                                    "
                    >
                      <div
                        className="absolute left-[50%] top-0
                                    translate-x-[80%]
                                    translate-y-[-45%]
                                     h-6 w-6 rotate-45 rounded bg-richblack-5"
                      ></div>

                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link to={`${subLink.link}`} key={index}>
                            <p>{subLink.name}</p>
                            {console.log("This is sublink:", subLink)}
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* login/signup/dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <CiShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button
                className="border border-richblack-700 bg-richbalck-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md
                            "
              >
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button
                className="border border-richblack-700 bg-richbalck-800 px-[12px] py-[8px]
                            text-richblack-100 rounded-md
                            "
              >
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};
