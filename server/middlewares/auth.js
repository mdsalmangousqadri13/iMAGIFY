import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({ success: false, message: 'Not Authorized. Login Again'});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode){
            req.body.userId = tokenDecode.id
        }else{
            return res.json({ success: false, message: 'Not Authorized. Login Again' })
        }

        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
 



// import jwt from 'jsonwebtoken';

// const userAuth = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ success: false, message: 'Not authorized. Please log in again.' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (decoded) {
//             req.body.userId = decoded.id;  // Attach the user ID to the request object
//             next();
//         } else {
//             return res.status(401).json({ success: false, message: 'Not authorized. Invalid token.' });
//         }

//     } catch (error) {
//         if (error instanceof jwt.TokenExpiredError) {
//             return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
//         }
//         if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
//         }
//         res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//     }
// };

// export default userAuth;
