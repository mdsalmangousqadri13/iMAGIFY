// import axios from "axios"
// import userModel from "../models/userModel.js"
// import FormData from "form-data"


// export const generateImage = async (req, res) => {
//     try {
        
//         const { userId, prompt } = req.body

//         const user = await userModel.findById(userId)

//         if(!user || !prompt){
//             return res.json({ success: false, message: 'Missing Details'})
//         }

//         if(user.creditBalance === 0 || userModel.creditBalance < 0){
//             return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
//         }

//         const formData = new FormData()
//         formData.append('prompt', prompt)

//         const { data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
//             headers: {
//                 'x-api-key': process.env.CLIPDROP_API,
//               },
//               responseType: 'arraybuffer'
//         })

//         const base64Image = Buffer.form(data, 'binary').toString('base64')
//         const resultImage = `data:image/png:base64,${base64Image}`

//         await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1 })

//         res.json({success: true, message: "Image Generated", creditBalance: user.creditBalance - 1, resultImage})

//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
// }



import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.creditBalance <= 0) {
            return res.status(400).json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
                ...formData.getHeaders()  // Ensure proper form-data headers
            },
            responseType: 'arraybuffer'
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');  // Fixed Buffer usage
        const resultImage = `data:image/png;base64,${base64Image}`;          // Fixed base64 format

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage
        });

    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
