import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { appRoutes } from './routes/routes';

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // L'URL del tuo frontend
  optionsSuccessStatus: 200 // Per browser legacy che non supportano CORS
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', appRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});