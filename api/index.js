const express = require("express");
const path = require("path");
const cors = require("cors");
const { createServer } = require("http");
const { PORT } = require("./config/keys");

const authRouter = require("./routes/auth");
const accountRouter = require("./routes/accounts");
const departmentRouter = require("./routes/departments");
const censusRouter = require("./routes/census");
const citizenRouter = require("./routes/citizen");
const privRouter = require("./routes/priv");
const analyseRouter = require("./routes/analyse");

const app = express();
const server = createServer(app);

app.use(cors({ origin: "http://localhost:5500" }));
app.use(express.json());

const staticPath = path.join(__dirname, "../client");
app.use(express.static(staticPath));

app.use("/auth", authRouter);
app.use("/accounts", accountRouter);
app.use("/departments", departmentRouter);
app.use("/census", censusRouter);
app.use("/citizen", citizenRouter);
app.use("/priv", privRouter);
app.use("/analyse", analyseRouter);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
