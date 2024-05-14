import express from 'express';
import database from './config/dbConfig.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import WorkbenchRoutes from './routes/workbenchRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import CategoryRoutes from './routes/categoryRoutes.js';
import OrderRoute from './routes/orderRoutes.js';
import TransactionRoute from './routes/transactionRoutes.js';
import transactionItemsRoute from './routes/itemRoutes.js';

const app = express();
const PORT = 5000;

// Database Connection
try {
    await database.authenticate();
    console.log("Database connected successfully")
} catch (error) {
    console.log("Connecting Error " + error);
}

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload()); // File upload middleware should come after json parsing and before your routes.

// Routes
app.use('/kiosk', WorkbenchRoutes);
app.use('/products', ProductRoutes);
app.use('/categories', CategoryRoutes)
app.use('/orders', OrderRoute);
app.use('/transactions', TransactionRoute);
app.use('/transactionItems', transactionItemsRoute);

// Start server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});