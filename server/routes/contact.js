import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

const contactRouter = express();

contactRouter.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    const mail = process.env.user;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Invalid request. Please provide all required fields.' });
    }

    try {
        // Define the HTML content for the email
        const htmlContent = `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.user,
                pass: process.env.PASS,
            },
        });

        // Send the email
        const info = await transporter.sendMail({
            from: `"Message from form" <${email}>`,
            to: `${mail}`,
            subject: "Contact Form Submission",
            html: htmlContent,
        });
        //console.log("mail sent successfully" + " " + info.response);   
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default contactRouter;
