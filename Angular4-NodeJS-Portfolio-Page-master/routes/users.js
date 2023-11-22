const express     = require('express'),
jwt               = require('jsonwebtoken'),
User              = require('../models/user'),
passport          = require('passport'),
config            = require('../config/database'),
router      = express.Router();

verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // Get token from bearer
        const bearerToken = bearerHeader.split(' ')[1];

        //set token
        req.token = bearerToken

        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

router.post('/register', (req, res, next) =>{
    console.info('Request: ', req.body.username)
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    console.info('New User: ', newUser);

    User.addUser(newUser,  (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user.'})
        } else {
            res.json({success: true, msg:'User registered.'})

        }
    })

});

//Login
router.post('/login', (req, res, next) =>{
     // Mock Profile
     const profile = {
        id: 1,
        username: 'Gabriel',
        email: 'gabriel@gmail.com'
    }
    //sign params: payload, secret key
    jwt.sign({profile}, 'secretkey',{expiresIn: '30m'}, (err, token) => {
        res.json({
            token
        });
    });
});

//Profile - Protected Route
router.post('/profile', verifyToken, (req, res, next) =>{
    // Mock Profile
    const profile = {
        id: 1,
        username: 'Gabriel',
        email: 'gabriel@gmail.com'
    }

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
        res.json({authData})
        }
    });
    
});

//Authenticate
router.post('/authenticate', (req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        if(!user){
            return res.json({success: false, msg: 'User not found.'})
        } 

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){

                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 604800 //1 Week
                });

                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        })
    })
});

//Token format:
// Authorization: Bearer <access_token>




module.exports = router;