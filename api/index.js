const express = require("express");
const { createServer } = require("http");
const { PORT } = require("./config/keys");

const authRouter = require("./routes/auth");
const a1Router = require("./routes/a1");
const a2Router = require("./routes/a2");
const a3Router = require("./routes/a3");
const b1Router = require("./routes/b1");
const b2Router = require("./routes/b2");

const app = express();
const server = createServer(app);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/a1", a1Router);
app.use("/a2", a2Router);
app.use("/a3", a3Router);
app.use("/b1", b1Router);
app.use("/b2", b2Router);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
