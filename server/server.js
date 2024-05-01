import express from 'express';
import cors from 'cors';
import authRegisRoute from './UMS_Modules/RBACModule/routes/accountRoutes.js';
import database from './UMS_Modules/config/dbconfig.js'

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow only these HTTP methods
}));

// Parse JSON request body
app.use(express.json());

// Mount routes
app.use('/', authRegisRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

database.sync()
  .then(() => {
    console.log('Database synced successfully');
    // Start your server or any other operations
  })
  .catch(err => {
    console.error('Error syncing database:', err);
});