// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='flex items-center justify-between gap-4 py-3 mt-20 '>

//         <img src={assets.logo} alt="" width={150}/>

//         <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @salman.dev | All right reserved.</p>

//         <div className='flex gap-2.5 '>
//             <img src={assets.facebook_icon} alt="" width={35} />
//             <img src={assets.instagram_icon} alt="" width={35} />
//             <img src={assets.twitter_icon} alt="" width={35} />
//         </div>

//     </div>
//   )
// }

// export default Footer



//Github

import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='flex items-center justify-between gap-4 py-6 mt-20 px-4 md:px-10 bg-gray-100'>

      <img 
        src={assets.logo} 
        alt="Website logo" 
        width={150} 
        className='object-contain'
      />

      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 hidden md:block'>
        Copyright © salman.dev | All rights reserved.
      </p>

      <div className='flex gap-2.5'>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={assets.facebook_icon} 
            alt="Facebook" 
            width={35} 
            className='hover:opacity-80 transition duration-300'
          />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={assets.instagram_icon} 
            alt="Instagram" 
            width={35} 
            className='hover:opacity-80 transition duration-300'
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img 
            src={assets.twitter_icon} 
            alt="Twitter" 
            width={35} 
            className='hover:opacity-80 transition duration-300'
          />
        </a>
      </div>

    </footer>
  )
}

export default Footer
