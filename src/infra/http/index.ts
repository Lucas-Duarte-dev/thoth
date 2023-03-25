import { app } from './server';
import dotenv from 'dotenv';

dotenv.config();
app.listen(process.env.PORT || 3000);
