const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")


const JWT_SECRET = "heyitsofficial";

// ROUTE 1: Create a User using POST: "/api/auth/createuser". No Login required.
router.post('/createuser',
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }), async (req, res) => {

        // If there are errors return Bad requests and errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check whether the email already exist or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json({ error: "sorry email id already exists" });
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            })
            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json(authtoken);
        } catch (error) {
            res.status(500).send({ error: "Internal server error!" })
        }
    });


// ROUTE 2: Authenticate a user using POST:"/api/auth/login". No Login required.

router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be empty').exists(),
], async (req, res) => {

    let success = false;

    // If there are errors return Bad requests and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please login with the correct ceredentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Please login with the correct ceredentials." });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
    } catch (error) {
        res.status(500).send("Internal Server error")
    }

});


// ROUTE 3: Get loggedin user details using POST:"/api/auth/getuser". Login Required

router.post("/getuser", fetchuser, async (req,res)=>{

    try{
        const userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        res.send(user);
    } catch(error){
        res.status(500).send("Internal Server error")
    }
})

module.exports = router;