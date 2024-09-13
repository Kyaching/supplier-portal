const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const {Server} = require("socket.io");
const {initSocket} = require("./routes/socket");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(cors({origin: ["http://localhost:5173"], credentials: true}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));

app.use(cookieParser());

app.get("/", async (req, res, next) => {
  res.send({message: "Awesome it works 🐻"});
});

app.use("/api", require("./routes/api.route"));

app.use("/api", require("./routes/message.route"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
