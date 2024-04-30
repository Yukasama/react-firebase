const express = require("express");
const cors = require("cors");
const routes = require("./routes/finance");
require("dotenv").config();
const app = express();

const PORT = process.env.PROXY_PORT || 5001;
app.use(cors());

app.use("/api", routes);

app.listen(PORT);
