//
import express from "express";

const app = express();
const port = 3000;

app.get("/a", (req, res) => {
  res.send("dkfdhfkdhk");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
