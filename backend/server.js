import express from 'express';
import cors from 'cors';
import { verifyDatabaseConnection } from './db.js';
import freelancersRoutes from './routes/freelancers.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

verifyDatabaseConnection();

app.use('/api/freelancers', freelancersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
