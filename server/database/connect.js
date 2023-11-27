import mongoose from 'mongoose';

const connectDB = (url) => {
  // Set mongoose option to enable strict query mode
  mongoose.set('strictQuery', true);
  
  // Connect to MongoDB using the provided URL
  mongoose.connect(url, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new server discovery and monitoring engine
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB');
    console.error(err);
  });
};

export default connectDB;