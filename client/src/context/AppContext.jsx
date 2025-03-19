// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const AppContext = createContext()

// const AppContextProvider = (props) => {
//     const [user, setUser] = useState(null);
//     const [showLogin, setShowLogin] = useState(false);
//     const [ token, setToken ] = useState(localStorage.getItem('token'))

    
    
//     const [ credit, setCredit ] = useState(false)
//     const backendUrl = import.meta.env.VITE_BACKEND_URL

//     const navigate = useNavigate()

//     const loadCreditsData = async ()=>{
//         try {
//             const {data} = await axios.get(backendUrl +'/api/user/credits', {headers: {token}})

//             if(data.success){
//                 setCredit(data.credits)
//                 setUser(data.user)
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
            
//         }
//     }

//     const generateImage = async(prompt)=>{
//         try {
//             const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})

//             if(data.success){
//                 loadCreditsData()
//                 return data.resultImage
//             }else{
//                 toast.error(data.messsage)
//                 loadCreditsData()
//                 if(data.creditBalance === 0){
//                     navigate('/buy')
//                 }
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     const Logout = ()=>{
//         localStorage.removeItem('token')
//         setToken('')
//         setUser(null)
//     }

//     useEffect(()=>{
//         if(token){
//             loadCreditsData()
//         }
//     },[token])

//     const value = {
//         user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, Logout, generateImage
//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }
// export default AppContextProvider



//Github

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  // 🌟 State Management
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credit, setCredit] = useState(0);          // ✅ Default to 0 instead of false
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  // 🌟 Function to load credits data
  const loadCreditsData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token }
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message || "Failed to load credits");
      }

    } catch (error) {
      console.error("Error loading credits:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // 🌟 Function to generate images
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        await loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message || "Failed to generate image");
        await loadCreditsData();

        if (data.creditBalance === 0) {
          navigate('/buy').catch((error) => console.error("Navigation error:", error));
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // 🌟 Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCredit(0);
    toast.info("Logged out successfully!");
  };

  // 🌟 Effect to load credits on initial render
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  // 🌟 Context Value
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
