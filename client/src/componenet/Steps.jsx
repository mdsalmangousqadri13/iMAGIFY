// import React from 'react'
// import { stepsData } from '../assets/assets'
// import { motion } from "motion/react"

// const Steps = () => {
//   return (
//     <motion.div
//     initial={{opacity:0.2, y:100}}
//     transition={{duration:1}}
//     whileInView={{opacity: 1, y:0}}
//     viewport={{ once: true}}
//     className='flex flex-col items-center justify-center my-32'>
//        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it work</h1> 
       
//        <p>Transform Words Into Stunning Images</p>

//        <div className='space-y-4 w-full max-w-3xl text-sm'>
//         {stepsData.map((item, index) => (
//             <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
//                 <img width={40} src={item.icon} alt="" />
//                 <div>
//                     <h2 className='text-xl font-medium'>{item.title}</h2>
//                     <p className='text-gray-500'>{item.description}</p>
//                 </div>
//             </div>
//         ))}
//        </div>
//     </motion.div>
//   )
// }

// export default Steps

//Github

import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'   // ✅ Correct Import

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='flex flex-col items-center justify-center my-32 px-4'
    >
      {/* Header */}
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-center'>
        How it Works
      </h1> 

      <p className='text-gray-600 text-sm sm:text-base mb-8'>
        Transform Words Into Stunning Images
      </p>

      {/* Steps Container */}
      <div className='w-full max-w-3xl space-y-6'>
        {stepsData.map((item) => (
          <motion.div
            key={item.title}    // Use item.title as key for consistency
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className='flex items-center gap-6 p-6 px-8 bg-white shadow-lg border rounded-lg cursor-pointer transition-all'
          >
            {/* Icon */}
            <img 
              width={50} 
              src={item.icon} 
              alt={item.title} 
              className='object-contain'
            />

            {/* Content */}
            <div>
              <h2 className='text-lg sm:text-xl font-medium text-gray-800'>
                {item.title}
              </h2>
              <p className='text-gray-500 text-sm sm:text-base'>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
