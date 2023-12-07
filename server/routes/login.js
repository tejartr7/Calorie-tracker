import express from "express";
import User from '../database/user.js';
import bcrypt from 'bcrypt';
const login = express();

login.get('/', async (req, res) => {
    try {
        const { email, password } = req.query; // Get data from query parameters
       // console.log(req.email);
        // Check if a user with the provided email exists
        const existingUser = await User.findOne({ email });
        console.log(email);
        if (!existingUser) {
            console.log("User with this email does not exist");
            return res.status(404).json({ message: 'User with this email does not exist' });
        }
        
        // Compare the provided password with the stored password
        if (bcrypt.compareSync(password, existingUser.password) === false) {
            console.log("Incorrect password");
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If login is successful, send user details in the response
        return res.status(200).json({ message: 'Login successful', user: existingUser });
    } catch (error) {
        console.error(error);
        console.log("Not connected to the server");
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default login;