import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  breakfast: [],
  lunch: [],
  dinner: [],
  snack1: [],
  snack2: [],
  water: [],
});

const UserItems= mongoose.model('UserItems', userSchema);
export default UserItems;
