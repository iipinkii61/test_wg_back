const express = require("express");
const errorMiddleware = require("./middlewares/error");

const authRoute = require("./routes/auth-route");
const { sequelize } = require("./models");

const app = express();

app.use(express.json());

// sequelize.sync({ force: true });

app.use("/auth", authRoute);
app.use(errorMiddleware);

app.listen(8000, () => console.log("server running on port 8000"));
