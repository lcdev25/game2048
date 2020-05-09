import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import path from 'path';
import connectDB from './config/db';
import GameRouter from './routes/game-info';
import * as expressIp from 'express-ip';

connectDB()
    .then()
    .catch((e) => console.log(`Mongo connection error: ${JSON.stringify(e)}`));

const app = express();

app.use(expressIp().getIpInfoMiddleware);
app.use(express.json());

app.use('/api/game-info', GameRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
