import express from 'express';
import database from './config/dbConfig.js';
import cors from 'cors';
import WorkbenchRoutes from './routes/workbenchRoutes.js';

const app = express();

const PORT = 5000;

// Database Connection
try {
    await database.authenticate();
    console.log("Database connected successfully")
} catch (error) {
    console.log("Connecting Error " + error);
}

app.use('/workbench', WorkbenchRoutes);

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});