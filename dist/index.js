"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = require("path");
const app = express();
let counter = 0;
app.use(express.json());
app.use(express.static('client/build'));
app.get('*', (req, res) => {
    console.log(`Starting game: ${counter++}`);
    res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
//# sourceMappingURL=index.js.map