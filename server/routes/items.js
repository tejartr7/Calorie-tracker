import express from "express";
import UserItems from "../database/userItems.js";
import User from "../database/user.js";

const items = express.Router();

items.get('/:email/:title', async (req, res) => {
    const { email, title } = req.params;
    const existingUser = await User.findOne({ email });

    if (existingUser === null) {
        return res.status(404).json({ message: 'User with this email does not exist' });
    }

    // Assuming you have a "UserItems" model for the user items
    const userItems = await UserItems.find({ email });
   // console.log(userItems.length);
    const temp = title.toLowerCase();
   // console.log("title is " + temp);
    // Filter userItems based on the provided title
    if(userItems.length===0)
    {
        return res.status(201).json('');
    }
    const itemsWithGivenTitle = userItems[0][title.toLowerCase()];
    // console.log(itemsWithGivenTitle);
    // Return the filtered array
    return res.status(200).json(itemsWithGivenTitle);
});

export default items;
