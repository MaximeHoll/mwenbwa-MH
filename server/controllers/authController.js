const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')
const jwt_decode = require("jwt-decode")



//@desc Login
//@route POST /auth
//@access Public

const login = asyncHandler(async (req,res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({ message: 'All fields are required'})
    }

    const foundUser = await User.findOne({email}).exec()
    

    if(!foundUser) {
        return res.status(401).json({message: 'User not found'})
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({message: 'Password does not match'})

    

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": foundUser._id,
                "admin": foundUser.admin
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    )

    const refreshToken = jwt.sign(
        { "UserInfo": {"id": foundUser._id, "admin": foundUser.admin}},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    //create a secure cookie with refresh token
    res.cookie('monbois', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None', 
        maxAge: 7*24*60*60*1000 //matches refresh 
    })

    data = jwt_decode(accessToken)

    res.json({ data })
})

//@desc Refresh
//@route POST /auth/refresh
//@access Public - access token expired

const refresh = (req,res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({message: 'Forbidden'})

            const foundUser = await User.findOne({username: decoded.username}).exec()
            

            if(!foundUser) {
                return res.status(401).json({message: 'Unauthorized'})
            }

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": foundUser._id,
                        "admin": foundUser.admin
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            )

            res.json({ accessToken })
        })
    )
}

//@desc Logout
//@route POST /auth/logout
//@access Public - clear cookies if any

const logout = (req,res) => {
    const cookies = req.cookies
    // if (!cookies?.jwt) return res.sendStatus(204) //No content
    // res.clearCookie('openlake', { httpOnly: true, sameSite: 'None', secure: true })
    // res.json({message: 'Cookie cleared'})
    res.status(202).clearCookie('openlake').send('cookie cleared')

}

module.exports = {
    login,
    refresh,
    logout
}

