const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const cors = require("cors");
app.use(cors());

app.use(session({
    secret: "austin",
    name: "austin",
    cookie: { maxAge: 8000000 },
    resave: false,
    saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require("./routes")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server Start on PORT: ${PORT}`);
})