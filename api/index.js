const express = require("express");
const path = require("path");
const cors = require("cors");
const { createServer } = require("http");
const { PORT } = require("./config/keys");

const authRouter = require("./routes/auth");
const a1Router = require("./routes/a1");
const a2Router = require("./routes/a2");
const a3Router = require("./routes/a3");
const b1Router = require("./routes/b1");
const b2Router = require("./routes/b2");
const testRouter = require("./routes/test");

const app = express();
const server = createServer(app);

app.use(cors({ origin: "http://localhost:5500" }));
app.use(express.json());

const staticPath = path.join(__dirname, "../client");
app.use(express.static(staticPath));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/login/login.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/Home/main.html"));
});

app.use("/auth", authRouter);
app.use("/a1", a1Router);
app.use("/a2", a2Router);
app.use("/a3", a3Router);
app.use("/b1", b1Router);
app.use("/b2", b2Router);
app.use("/test", testRouter);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
