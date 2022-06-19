const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const uploadRoute = require("./routes/upload");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/upload", uploadRoute);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
