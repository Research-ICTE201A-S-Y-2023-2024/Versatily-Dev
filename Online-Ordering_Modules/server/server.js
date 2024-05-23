import express from 'express';
import database from './config/dbConfig.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import ProductRoutes from './routes/productRoutes.js';
import CategoryRoutes from './routes/categoryRoutes.js';
import ItemsRoute from './routes/itemRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import AccountRoutes from './routes/accountRoutes.js';

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
app.use('/products', ProductRoutes);
app.use('/categories', CategoryRoutes)
app.use('/items', ItemsRoute);
app.use('/orders', OrderRoutes);
app.use('/', AccountRoutes);

// Start server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});