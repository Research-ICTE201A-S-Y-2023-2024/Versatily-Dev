import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import contentRouter from './modules/router/postRoutes.js';

const app = express();
const PORT = 3001;

// CORS options to restrict to specific origin
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Use the content router
app.use(contentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
