import express from 'express';
import cors from 'cors';
import {bookRoutes} from './routes/routes';
import errorHandler from './middleware/errorHandler';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log('Parsed request body:', req.body);
    next();
  });

app.use('/books', bookRoutes);





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);
