import express from 'express';
import User from '../database/user.js';
import UserItems from '../database/userItems.js';

const reset = express.Router();

reset.post("/", async (req, res) => {
    const { email } = req.body.params; // Change here to retrieve from query parameters
    //console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
    }
    const existingUserItems = await UserItems.findOne({ email });
    if (!existingUserItems) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
    }
    if (existingUserItems) {
        existingUserItems.breakfast = [];
        existingUserItems.lunch = [];
        existingUserItems.dinner = [];
        existingUserItems.snack1 = [];
        existingUserItems.snack2 = [];
        existingUserItems.water = [];
        await existingUserItems.save();
        return res.status(200).json({ message: "Reset successful" });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});

export default reset;
