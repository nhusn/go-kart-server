const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    try{
        const token = req.headers['authorization'].split(' ')[1]
        const jwtResponse = jwt.verify(token,process.env.JWT_SECRET_CODE)
        req.payload = jwtResponse.userId
        next()
    }catch{
        res.status(401).json('Authorization Failed!!! Please login....')
    }
}

module.exports = jwtMiddleware