import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import UserItems from "../database/userItems.js";
import User from "../database/user.js";

dotenv.config({ path: '../.env' });

const mailRouter = express();
// Function to generate the HTML content for the email
function generateEmailContent(userItems) {
  const generateTableRows = (mealArray, mealName) => {
    if (mealArray.length === 0) {
      return '<tr><td colspan="4">No items added</td></tr>';
    }

    let totalCalories = 0;
    let totalProteins = 0;

    const rows = mealArray.map(item => {
      totalCalories += item.cal;
      totalProteins += item.proteins;

      return `
        <tr>
          <td>${item.itemName}</td>
          <td>${item.itemGrams}</td>
          <td>${item.cal}</td>
          <td>${item.proteins}</td>
        </tr>
      `;
    });

    // Add the total row
    rows.push(`
      <tr>
        <td>Total</td>
        <td></td>
        <td>${totalCalories}</td>
        <td>${totalProteins}</td>
      </tr>
    `);

    // Return the generated rows
    return rows.join('');
  };

  return `
    <h1>Hello there</h1>
    <p>This is your today calorie report</p>

    <!-- Breakfast Table -->
    <h2>Breakfast</h2>
    <table>
      <tr>
        <th>Item Name</th>
        <th>Grams</th>
        <th>Calories</th>
        <th>Proteins</th>
      </tr>
      ${generateTableRows(userItems.breakfast, 'Breakfast')}
    </table>

    <!-- Lunch Table -->
    <h2>Lunch</h2>
    <table>
      <tr>
        <th>Item Name</th>
        <th>Grams</th>
        <th>Calories</th>
        <th>Proteins</th>
      </tr>
      ${generateTableRows(userItems.lunch, 'Lunch')}
    </table>

    <!-- Snack1 Table -->
    <h2>Snack1</h2>
    <table>
      <tr>
        <th>Item Name</th>
        <th>Grams</th>
        <th>Calories</th>
        <th>Proteins</th>
      </tr>
      ${generateTableRows(userItems.snack1, 'Snack1')}
    </table>

    <!-- Snack2 Table -->
    <h2>Snack2</h2>
    <table>
      <tr>
        <th>Item Name</th>
        <th>Grams</th>
        <th>Calories</th>
        <th>Proteins</th>
      </tr>
      ${generateTableRows(userItems.snack2, 'Snack2')}
    </table>

    <!-- Dinner Table -->
    <h2>Dinner</h2>
    <table>
      <tr>
        <th>Item Name</th>
        <th>Grams</th>
        <th>Calories</th>
        <th>Proteins</th>
      </tr>
      ${generateTableRows(userItems.dinner, 'Dinner')}
    </table>

    <!-- Water Table -->
    <h2>Water</h2>
    <table>
      <tr>
        <th>Item Name</th>
        <th>Grams</th>
        <th>Calories</th>
        <th>Proteins</th>
      </tr>
      ${generateTableRows(userItems.water, 'Water')}
    </table>
  `;
}

mailRouter.get("/", async (req, res) => {
  try {
    // Retrieve email data from the request body
    const{ email }= req.query;
    const existingUser = await User.findOne({email});
    //console.log(email);
    if (!existingUser) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }

    const userItems = await UserItems.findOne({email});
    //console.log(userItems);
    if (!userItems) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }

    // Generate HTML content
    const htmlContent = generateEmailContent(userItems);
    //console.log(userItems);
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sai707nenupavan@gmail.com",
        pass: process.env.PASS,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: '"Track Calories" <sai707nenupavan@gmail.com>',
      to: 'codworldrtr7@gmail.com',
      subject: "Your calorie report for today",
      html: htmlContent,
    });

    return res.status(200).json({ message: "Mail sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default mailRouter;