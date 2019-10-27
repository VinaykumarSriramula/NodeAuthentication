const express = require("express");
require('./db/mongoose');
const UserRouter = require("./routers/userRoutes");
const app = express();
const port = process.env.PORT || 3000
app.use(express.json());


app.use(UserRouter);

app.listen(port , ()=>{
    console.log("App is listenoing on port :", port)
});