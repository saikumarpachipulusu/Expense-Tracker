const express = require("express");
require("./config/dbConnect");
const cors=require("cors");
const usersRoute = require("./routes/users/usersRoute");
const accountsRoute = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const globalErrHandler = require("./middlewares/globalErrHandler");
const app = express();

//middlewares
app.use(express.json()); //pass incoming data

//cors middleware
app.use(cors());
//routes

//users route

app.use("/api/v1/users", usersRoute);

//account route

app.use("/api/v1/accounts", accountsRoute);

//transaction route

app.use("/api/v1/transactions", transactionsRoute);

//Error Handlers
app.use(globalErrHandler);

//listen to Server
const PORT = process.env.port || 9000;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
