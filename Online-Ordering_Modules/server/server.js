import express from "express";
import database from "./config/dbConfig.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path"; // Import path module for working with file paths
import fs from "fs"; // Import fs module for file system operations
import nodemailer from "nodemailer"; // Import nodemailer for sending emails
import ProductRoutes from "./routes/productRoutes.js";
import CategoryRoutes from "./routes/categoryRoutes.js";
import ItemsRoute from "./routes/itemRoutes.js";
import OrderRoutes from "./routes/orderRoutes.js";
import AccountRoutes from "./routes/accountRoutes.js";

const app = express();
const PORT = 5000;

// Database Connection
try {
    await database.authenticate();
    console.log("Database connected successfully");
} catch (error) {
    console.error("Connecting Error: ", error); // Use console.error for errors
}

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files from 'public' directory
app.use(fileUpload({ createParentPath: true })); // File upload middleware

// Define the upload directory
const uploadDir = path.join(process.cwd(), 'public/customerReceipt/');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// File upload endpoint
app.post('/upload', async (req, res) => {
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const pdfFile = req.files.file;
    const {email} = req.body;

    const uploadPath = path.join(uploadDir, pdfFile.name);

    // Use the mv() method to place the file somewhere on your server
    pdfFile.mv(uploadPath, async function(err) {
        try {
            if (err) {
                throw err; // Throw error if mv() method encounters an error
            }

            // Send email with attached file
            sendEmailWithAttachment(uploadPath, email);

            // If file upload and email sending are successful, send success response
            res.send({ message: 'File uploaded successfully and email sent', filePath: uploadPath, Email: email });
        } catch (error) {
            // Handle error if thrown during file upload or email sending
            res.status(500).json({ error: 'Error uploading file and sending email', message: error.message,});
        }
    });
});

// Function to send email with attachment using nodemailer
const sendEmailWithAttachment = async(filePath, recipientEmail) => {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'delgadoargie04@gmail.com',
            pass: 'slzmauxvdfbygyyc'
        }
    });

    // Read file content
    let fileContent = fs.readFileSync(filePath);

    // File details
    let fileName = path.basename(filePath);

    const sender = 'delgadoargie04@gmail.com';

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: sender, // Sender address
        to: recipientEmail, // Recipient's email address
        subject: 'Customer Receipt', // Subject line
        text: 'Here is the receipt for your order placed with Cucina De Marquina, detailing the products purchased and their corresponding prices. Please review the information provided, and feel free to reach out if you have any questions or require further assistance regarding your purchase.', // Plain text body
        attachments: [
            {
                filename: fileName,
                content: fileContent,
                encoding: 'base64' // or 'utf-8'
            }
        ]
    });

    console.log('Message sent: %s', info.messageId);
}

// Routes
app.use("/products", ProductRoutes);
app.use("/categories", CategoryRoutes);
app.use("/items", ItemsRoute);
app.use("/orders", OrderRoutes);
app.use("/", AccountRoutes);

// Start server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});