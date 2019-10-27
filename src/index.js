const express = require("express");
require('./db/mongoose');
const UserRouter = require("./routers/userRoutes");

const app = express();
const port = process.env.PORT || 3000
app.use(express.json());

// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send("GET requests are disabled");
//     }else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.send(503).send("This site is under maintainence");
// })

app.use(UserRouter);

app.listen(port , ()=>{
    console.log("App is listenoing on port :", port)
});