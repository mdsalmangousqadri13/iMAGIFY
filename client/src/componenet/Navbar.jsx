// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { Link, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// // import { AppContext } from '../context/AppCOntext'

// const Navbar = () => {

//     const {user, setShowLogin, logout, credit} = useContext(AppContext)
//     const navigate = useNavigate()


//   return (
//     <div className='flex items-center justify-between py-4'>
//         <Link to='/'>
//          <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
//         </Link>

//         <div>
//             {
//             user ? 
//             <div className='flex items-center  gap-2 sm:gap-3'>
//                 <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm;px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
//                     <img className='w-5' src={assets.credit_star} alt="" />
//                     <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left : {credit}</p>
//                 </button>
//                 <p className='text-gray-600'>Hi, {user.name}</p>
//                 <div className='relative group'>
//                     <img src={assets.profile_icon} className='w-10' drop-shadow alt="" />

//                     <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
//                         <ul>
//                             <li onClick={logout}>Logout</li>
//                         </ul>

//                     </div>
//                 </div>
//             </div>
//             :
//             <div className='flex items-center gap-2 sm:gap-5'>
//                 <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
//                 <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
//             </div>
//             }
            
            
//         </div>
//     </div>
//   )
// }

// export default Navbar


// Github

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between py-4 px-4 sm:px-8 lg:px-16 bg-white shadow-sm'>

      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 lg:w-40' />
      </Link>

      {/* Navigation and Actions */}
      <div>
        {user ? (
          <div className='flex items-center gap-4 sm:gap-6'>

            {/* Credits Button */}
            <button 
              onClick={() => navigate('/buy')} 
              className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-300'
            >
              <img className='w-5' src={assets.credit_star} alt="Credit Icon" />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>
                Credits left: {credit || 0}
              </p>
            </button>

            {/* User Greeting */}
            <p className='text-gray-600 font-medium'>Hi, {user.name || 'Guest'}</p>

            {/* Profile Dropdown */}
            <div className='relative group'>
              <img 
                src={assets.profile_icon} 
                alt="Profile Icon" 
                className='w-10 cursor-pointer rounded-full hover:scale-105 transition-all'
              />

              <div className='absolute hidden group-hover:block right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-lg z-20 transition-all duration-300'>
                <ul className='text-gray-700'>
                  <li 
                    onClick={logout} 
                    className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-all'
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-4 sm:gap-6'>
            {/* Pricing Link */}
            <p 
              onClick={() => navigate('/buy')} 
              className='cursor-pointer text-gray-600 hover:text-blue-600 transition-all'
            >
              Pricing
            </p>

            {/* Login Button */}
            <button 
              onClick={() => setShowLogin(true)} 
              className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full hover:scale-105 transition-all'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
