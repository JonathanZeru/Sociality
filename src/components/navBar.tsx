import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const [user] = useAuthState(auth);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const [isTrue, setIsTrue] = useState<Boolean>(false);
  const [isTrue2, setIsTrue2] = useState<Boolean>(false);
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login")

  }
  const handleC = () => {
    setIsTrue(true);
    setIsTrue2(false)
  }
  const handleC2 = () => {
    setIsTrue2(true);
    setIsTrue(false)
  }
  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-8 bg-green-400">
      {user ? <Link to={"/"} className='font-bold text-2xl'>
        Sociality📗
      </Link> :
        <Link to={"/login"} className='font-bold text-2xl'>
          Sociality📗
        </Link>
      }
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"} >
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8 bg-green-400"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li>
                {user && <Link to="/"><h1
                  className='font-bold border-b-4 border-b-white-400
      hover:text-white ' style={{
                    color: isTrue ? 'green' : 'black'
                  }}
                  onClick={handleC}
                >Home</h1></Link>}

              </li>
              <li>
                {
                  user && <Link to="/create_post" className='font-bold border-b-4 border-b-white-400
              hover:text-white'style={{
                      color: isTrue2 ? 'green' : 'black'
                    }}
                    onClick={handleC2}>Post</Link>
                }
              </li>
              <li>
                {!user && <Link to="/login"><h1 className='bg-green-400 font-bold border-b-4 border-b-white-400
      hover:text-white'>Login</h1></Link>}
              </li>

              <li>
                {user &&
                  (
                    <>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-row items-center justify-center'>
                        <p>{auth.currentUser?.displayName}</p>
                        <img src={auth.currentUser?.photoURL || ""}
                          width={50}
                          height={20}
                          className='rounded-lg'
                        />
                    </div>
                        <button
                          className='w-full bg-green-300 rounded-lg p-1 border-2 border-green-400 active:bg-green-100 m-0'
                          onClick={signUserOut}
                        >Log Out</button>
                      </div>
                    </>
                  )}
              </li>
            </ul>

          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            {user && <Link to="/"><h1
              className='font-bold border-b-4 border-b-white-400
      hover:text-white ' style={{
                color: isTrue ? 'white' : 'black'
              }}
              onClick={handleC}
            >Home</h1></Link>}

          </li>
          <li>
            {
              user && <Link to="/create_post" className='font-bold border-b-4 border-b-white-400
              hover:text-white'style={{
                  color: isTrue2 ? 'white' : 'black'
                }}
                onClick={handleC2}>Post</Link>
            }
          </li>
          <li>
            {!user && <Link to="/login"><h1 className='font-bold border-b-4 border-b-white-400
      hover:text-white'>Login↩</h1></Link>}
          </li>
          <li>
            {user &&
              (
                <>
                  <div className='flex items-center justify-center'>
                    <p>{auth.currentUser?.displayName}</p>
                    <img src={auth.currentUser?.photoURL || ""}
                      width={25}
                      height={20}
                      className='rounded-lg'
                    />


                    <button className='bg-white rounded-lg p-1 border-2 border-green-900 active:bg-green-100 m-0'
                      onClick={signUserOut}
                    >Log Out↪</button>
                  </div>
                </>
              )}
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      {/* {
        user ? <> <Link to="/"><h1
        className='font-bold border-b-4 border-b-white-400
      hover:text-white'>Home</h1></Link> 
      <Link to="/create_post">Post</Link> </>
        : <Link to="/login"><h1 className='font-bold border-b-4 border-b-white-400
      hover:text-white'>Login</h1></Link>} */}

      {/* {user &&
        (
          <>
            <div className='flex items-center justify-center bg-red-400 m-0'>
              <p>{auth.currentUser?.displayName}</p>
              <img src={auth.currentUser?.photoURL || ""}
                width={50}
                height={20}
              />

            </div>
            <button
              className='bg-green-300 rounded-lg p-1 border-2 border-green-400 active:bg-green-100 m-0'
              onClick={signUserOut}
            >Log Out</button>
          </>
        )} */}
    </div>
  )
}

export default NavBar