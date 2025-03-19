// import React, { useContext, useEffect, useState } from 'react'
// import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext';
// import { motion } from "motion/react"  //framer-motion
// import axios from 'axios'
// import { toast } from 'react-toastify';


// const Login = () => {

//   const [state, setState] = useState('Login');
//   const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

//   const [ name, setName] = useState('')
//   const [ email, setEmail] = useState('')
//   const [ password, setPassword] = useState('')


//   const onSubmitHandler = async(e) => {
//     e.preventDefault();

//     try {
//       if(state === 'Login'){
//        const {data} = await axios.post(backendUrl + '/api/user/login', {email, password})

//         if(data.success){
//           setToken(data.token)
//           setUser(data.user)
//           localStorage.setItem('token', data.token)
//           setShowLogin(false)
//         }else{
//           toast.error(data.message)
//         }

//       }else{
//         const {data} = await axios.post(backendUrl + '/api/user/register', {name,email, password})

//         if(data.success){
//           setToken(data.token)
//           setUser(data.user)
//           localStorage.setItem('token', data.token)
//           setShowLogin(false)
//         }else{
//           toast.error(data.message)
//         }
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     document.body.style.overflow = 'hidden';

//     return()=>{
//       document.body.style.overflow = 'unset';
//     }
//   },[])

//   return (
//     <div
//     className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

//       <motion.form onSubmit={onSubmitHandler}
//       initial={{opacity:0.2, y:50}}
//       transition={{duration:0.3}}
//       whileInView={{opacity: 1, y:0}}
//       viewport={{ once: true}}
//        className='relative bg-white p-10 rounded-xl text-slate-500'>
//         <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
//         <p className='text-sm'>Welcome back! Please sign in to continue</p>

//         {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
//           <img src={assets.user_icon} alt="" />
//           <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm ' placeholder='Full Name' required />
//           </div>}

//          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//           <img src={assets.email_icon} alt="" />
//           <input onChange={e => setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm ' placeholder='Email id' required />
//           </div>

//         <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
//           <img src={assets.lock_icon} alt="" />
//           <input onChange={e => setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm ' placeholder='Password' required />
//         </div>

//         <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forget password?</p>

//         <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'login' : 'create account'}</button>

//         {state === 'Login' ? <p className='mt-5 text-center'>Dont't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign up')} >Sign up</span></p>
//         :
//         <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')} >Login</span></p>}

//         <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
//       </motion.form>

//     </div>
//   )
// }

// export default Login



//Github



import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";    // Corrected import
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    setLoading(true);

    try {
      const endpoint = state === 'Login' ? '/api/users/login' : '/api/users/register';
      const { data } = await axios.post(`${backendUrl}${endpoint}`, formData);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
        toast.success(`${state} successful!`);
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to connect to the server');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Disable scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md'
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state !== 'Login' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.user_icon} alt="user" />
            <input
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              type="text"
              className='outline-none text-sm w-full'
              placeholder='Full Name'
              required
            />
          </div>
        )}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="email" />
          <input
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            type="email"
            className='outline-none text-sm w-full'
            placeholder='Email ID'
            required
          />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="lock" />
          <input
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            type="password"
            className='outline-none text-sm w-full'
            placeholder='Password'
            required
          />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

        <button
          type="submit"
          className={`bg-blue-600 w-full text-white py-2 rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : (state === 'Login' ? 'Login' : 'Create Account')}
        </button>

        <p className='mt-5 text-center'>
          {state === 'Login' ? (
            <>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign up')}>Sign up</span></>
          ) : (
            <>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></>
          )}
        </p>

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className='absolute top-5 right-5 cursor-pointer w-5'
        />
      </motion.form>

    </div>
  );
};

export default Login;
