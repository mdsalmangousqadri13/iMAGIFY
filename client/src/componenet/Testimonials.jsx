// import React from 'react'
// import { assets, testimonialsData } from '../assets/assets'
// import { motion } from "motion/react"

// const Testimonials = () => {
//   return (
//     <motion.div 
//     initial={{opacity:0.2, y:100}}
//     transition={{duration:1}}
//     whileInView={{opacity: 1, y:0}}
//     viewport={{ once: true}}
//     className='flex flex-col items-center justify-center my-20 p-12'>

//     <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer testimonials</h1>
//     <p className='text-gray-500 mb-12'>What Our Users Are Saying</p>

//     <div className='flex flex-wrap gap-6'>
//        {testimonialsData.map((testimonial, index) => (
//         <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
//             <div className='flex flex-col items-center'>
//                 <img src= {testimonial.image} alt="" className='rounded-full w-14' />
//                 <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
//                 <p className='text-gray-500 mb-4'>{testimonial.role}</p>
//                 <div className='flex mb-4'>
//                     {Array(testimonial.stars).fill().map((item, index) =>(
//                         <img key={index} src={assets.rating_star} alt="" />
//                     ))}
//                 </div>
//                 <p className='text-center text-sm text-gray-600'>{testimonial.text}</p>
//             </div>
//         </div>
//        ))} 
//     </div>

//     </motion.div>
//   )
// }

// export default Testimonials


//Github

import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'   // ✅ Correct Import

const Testimonials = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='flex flex-col items-center justify-center my-20 px-6'
    >
      {/* Header */}
      <h1 className='text-3xl sm:text-4xl font-semibold mb-4 text-center'>
        Customer Testimonials
      </h1>
      <p className='text-gray-500 mb-12 text-center'>
        What Our Users Are Saying
      </p>

      {/* Testimonials Container */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl'>
        {testimonialsData.map((testimonial) => (
          <motion.div
            key={testimonial.name}    // Use name as key for consistency
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className='bg-white shadow-lg p-8 rounded-lg cursor-pointer transition-all'
          >
            {/* User Info */}
            <div className='flex flex-col items-center'>
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className='rounded-full w-20 h-20 object-cover mb-4'
              />
              <h2 className='text-xl font-semibold text-gray-800'>
                {testimonial.name}
              </h2>
              <p className='text-gray-500 text-sm mb-4'>{testimonial.role}</p>

              {/* Star Rating */}
              <div className='flex gap-1 mb-4'>
                {Array.from({ length: testimonial.stars }).map((_, index) => (
                  <img 
                    key={index} 
                    src={assets.rating_star} 
                    alt={`Star ${index + 1}`} 
                    className='w-5 h-5'
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className='text-center text-sm text-gray-600 leading-relaxed'>
                {testimonial.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Testimonials
