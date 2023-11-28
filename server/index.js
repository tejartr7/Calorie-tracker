import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './database/connect.js'
import login from './routes/login.js'
import user from './routes/user.js'
import register from "./routes/register.js";
import addItem from "./routes/addItem.js";
import items from "./routes/items.js"
import deleteItem from "./routes/deleteItem.js";
import mail from "./routes/mail.js";
import reset from "./routes/reset.js";


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.use("/login", login);
app.use("/sendmail",mail);
app.use("/users", user);
app.use("/register", register);
app.use("/add", addItem);
app.use("/items", items);
app.use("/delete", deleteItem);
app.use("/reset", reset);
app.listen(8000, () => {
    connectDB(process.env.MONGODB_URL);
    console.log('Server is running on port 8000');
});
