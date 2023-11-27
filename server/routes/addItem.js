import express from "express";
import UserItems from '../database/userItems.js';
import calorieProteinMap from "../database/DefaultItems.js";

const addItem = express.Router();

const calculateCaloriesAndProteins = (itemName, itemGrams) => {
    const calorieProteinInfo = calorieProteinMap.get(itemName.toLowerCase());

    if (!calorieProteinInfo) {
        // Item not found, set calories as itemGrams and proteins as 0
        const cal = parseInt(itemGrams);
        const proteins = 0;
        return { cal, proteins };
    }
    else {
        // Calculate calories and proteins based on item info
        const cal = (itemGrams / 100) * calorieProteinInfo.calories;
        const proteins = (itemGrams / 100) * calorieProteinInfo.proteins;
        return { cal, proteins };
    }
};

addItem.post('/', async (req, res) => {
    try {
        const { email, title, itemName, itemGrams } = req.body;

        // Validate required fields
        if (!email || !title || !itemName || itemGrams === undefined) {
            return res.status(400).json({ message: 'Invalid request. Please provide all required fields.' });
        }

        let existingUser = await UserItems.findOne({ email });

        if (!existingUser) {
            // If the user doesn't exist, create a new one
            existingUser = new UserItems({ email, breakfast: [], lunch: [], dinner: [], snack1: [], snack2: [], water: [] });
        }

        // Calculate calories and proteins
        const { cal, proteins } = calculateCaloriesAndProteins(itemName, itemGrams);

        // Add item to the appropriate meal category
        if (title === 'water' || title === 'breakfast' || title === 'lunch' || title === 'dinner' || title === 'snack1' || title === 'snack2') {
            existingUser[title].push({ itemName, itemGrams, cal, proteins });
        } else {
            return res.status(400).json({ message: 'Invalid title' });
        }

        await existingUser.save();
        return res.status(200).json({ message: 'Item added successfully', user: existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default addItem;
