import mongoose from 'mongoose';

// Define a schema for the user data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure that usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure that emails are unique
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
    }
});
const User = mongoose.model('user', userSchema);
export default User;