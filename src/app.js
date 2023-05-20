const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");

const authRoute = require("./routes/auth-route");
const dataRoute = require("./routes/data-route");
const adminRoute = require("./routes/admin-route");

const { sequelize, WeightHeight } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

// sequelize.sync({ force: true });

app.use("/auth", authRoute);
app.use("/data", authenticate, dataRoute);
app.use("/admin", authenticate, adminRoute);
app.use(errorMiddleware);

app.listen(8000, () => console.log("server running on port 8000"));
