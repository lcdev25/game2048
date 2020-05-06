import * as express from 'express';
import path from 'path';

const app = express();

let counter = 0;
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        console.log(`Starting game: ${counter++}`);
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
