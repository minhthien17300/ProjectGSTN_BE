const express = require("express");
const { configEnv } = require("./config/config");
const app = express();
const route = require("./routes/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const server = require("http").Server(app);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.use(cors());

app.use(route);
app.get("/healCheck", (req, res) =>
  res.status(200).json({ hello: "Chào mừng đến với Gia Sư Tài Năng" })
);
app.get("/*", (req, res) => res.send({ message: "Can not access route" }));

server.listen(configEnv.PORT, () => {
  console.log(`App running in port ${configEnv.PORT}`);
});
