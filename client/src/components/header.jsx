import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { firebaseAuth } from "../config/firebase.config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { createUser } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER, SET_USER_NULL } from "../context/actions/userAction";
import { mainmenu } from "../utils/supports";

const Header = () => {
  // const [user, setuser] = useState(null);
  const [color, setColor] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    const changeColor = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY >= 1) {
          // console.log("ScrollY:", window.scrollY);
          setColor(true);
        } else {
          setColor(false);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", changeColor);
    }
  }, []);

  const signInwithGmail = async () => {
    await signInWithRedirect(firebaseAuth, provider).then((result) => {
      console.log(result?.user?.providerData[0]);
      dispatch(SET_USER(result?.user?.providerData[0]));
      createUser(result?.user?.providerData[0]).then((res) => {
        return res;
      });
    });
  };

  const logOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      navigate("/", { replace: true });
    });
  };

  return (
    <header
      className={` fixed inset-x-0 sm:px-12 py-3 lg:px-32  xl:px-44 z-50 transition-all  duration-300 flex  items-center justify-between ${
        color ? ` bg-white` : ` bg-transparent`
      }`}
    >
      {/* image section */}
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Main Logo"
          className="w-24 h-auto object-contain"
        />
      </Link>

      {/* User profile section */}

      <div className="flex items-center gap-4 justify-center">
        {user ? (
          <div className=" cursor-pointer relative ">
            <img
              src={user.photoURL}
              className=" w-10 h-10 object-cover  rounded-full "
              alt="user-profile"
              referrerPolicy="no-referrer"
              onClick={() => setIsMenu(!isMenu)}
            />
            {isMenu && (
              <div
                onMouseLeave={() => setIsMenu(!isMenu)}
                className="absolute right-0 flex gap-2 flex-col top-12 shadow-md justify-center  items-start bg-navBar text-white w-48 py-2 px-4 rounded-md "
              >
                <h2 className=" text-gray-50 font-semibold ">
                  {user.displayName}
                </h2>
                <div className="w-full">
                  {mainmenu &&
                    mainmenu.map((menu) => (
                      <div className="py-2 text-sm ">
                        <Link
                          to={`/newPost/${menu.slug}`}
                          className="text-base hover:text-gray-100 text-gray-300"
                        >
                          {menu.name}
                        </Link>
                      </div>
                    ))}
                  <div className="w-full h-[1px] bg-gray-700"></div>
                  <p className=" py-2  text-gray-300" onClick={logOut}>
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center border  border-e-gray-600 rounded-md jutify-center gap-2 px-2 backdrop-blur-md cursor-pointer  hover:shadow-md active:scale-95 transition-all ease-in-out duration-150 "
            onClick={signInwithGmail}
          >
            <FcGoogle />
            <p
              className={` text-base ${` color ? 'text-primary' : ' text-gray-200 '`}`}
            >
              login
            </p>
          </div>
        )}
        {user && (
          <div>
            <Link
              to={"/newPost/upload"}
              className=" text-base px-4 py-2 text-primary cursor-pointer rounded-full bg-emerald-200 hover:bg-emerald-300 font-semibold"
            >
              Upload
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
