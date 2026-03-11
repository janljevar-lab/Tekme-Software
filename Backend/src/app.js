import express from 'express';

const app = express();

app.use(express.json());

import tekmeRouter from './routes/tekma.route.js';
import igralciRouter from './routes/igralec.route.js';
import rezultatiRouter from './routes/rezultat.route.js';


app.use('/api/v1/tekme', tekmeRouter);
app.use('/api/v1/igralci', igralciRouter);
app.use('/api/v1/rezultati', rezultatiRouter);

//exemple route http://localhost:5000/api/v1/users/register

export default app;