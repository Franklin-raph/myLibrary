const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protectedRoute = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get the token
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await User.findById(decodedToken.id).select('-password')

            next()
        }catch(error){
            console.log(error)
            res.status(401).json({msg:"Not authorized, invalid token"})
        }
    }

    // checking if token is not present
    if(!token){
        res.status(401).json({msg:"Not authorized, no token present"})
    }
}

module.exports = { protectedRoute }