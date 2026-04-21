import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/health', (req, res) => {
  res.json({ message: "something" });
});

app.listen(4000, () => {
  console.log("Server is running!");
});
