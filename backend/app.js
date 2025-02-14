require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");

const PORT = 6010;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
// this line means if any user call "/uploads" api means they want access to my upload folder
app.use(router);

app.listen(PORT, () => {
  console.log(`Server Start at port no ye ${PORT}`);
});
