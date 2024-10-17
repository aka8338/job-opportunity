const express = require("express");
const dotenv = require("dotenv");
const apiRouter = require("./routes/api");

const port = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
