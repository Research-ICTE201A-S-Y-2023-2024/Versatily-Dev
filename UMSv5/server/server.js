import express from 'express';
import cors from 'cors';
import accounts_router from './modules/account_modules/routers/accountsRoutes.js';
import roleRouter from './modules/role_modules/routes/roleRoutes.js';
import database from './config/db.js'

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow only these HTTP methods
}));

// Parse JSON request body
app.use(express.json());

// Account Routes

app.use('/', accounts_router)
app.use('/roles', roleRouter)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

database.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
});