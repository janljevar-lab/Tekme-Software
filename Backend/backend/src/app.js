import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

import tekmeRouter from './routes/tekma.route.js';
import igralciRouter from './routes/igralec.route.js';


app.use('/api/v1/tekme', tekmeRouter);
app.use('/api/v1/igralci', igralciRouter);

//exemple route http://localhost:6380/api/v1/igralci/igralec/1

export default app;