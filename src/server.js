const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.send("hellooooo");
});

app.post('/profile', (req,res) => {
    const user = {
        name: "sam",
        hobby: "code"
    }
    res.send(user);
});

app.listen(3000);