const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.listen(1010, () => {
    console.log('http://localhost:1010');
});
