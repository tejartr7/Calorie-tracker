import express from 'express';
import User from '../database/user.js';
import UserItems from '../database/userItems.js';

const deleteItem = express.Router();

deleteItem.delete('/', async (req, res) => {
    const { mail, title, itemName, itemGrams } = req.body;
   // console.log(req.body);
    const user = await User.findOne({ email: mail });
    if (!user) {
        return res.status(404).json({ message: 'User with this email does not exist' });
    }

    const userItems = await UserItems.findOne({ email: mail });
    if (!userItems) {
        return res.status(404).json({ message: 'User items not found' });
    }

    // Find the index of the item to delete within the specified title
    const titleIndex = userItems[title.toLowerCase()];
    if (!titleIndex) {
        return res.status(404).json({ message: 'Title not found' });
    }

    let itemIndex = -1;
    for (let i = 0; i < titleIndex.length; i++) {
        if (titleIndex[i].itemName === itemName && titleIndex[i].itemGrams === itemGrams) {
            itemIndex = i;
            break;
        }
    }

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item with this name and grams does not exist' });
    }

    // Remove the item from the titleIndex
    titleIndex.splice(itemIndex, 1);

    // Save the updated userItems
    await userItems.save();

    return res.status(200).json({ message: 'Item deleted successfully' });
});

export default deleteItem;
