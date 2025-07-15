import express from 'express';
import 'dotenv/config';
import { connectdb } from './config/db.js';
import transactionsRoute from './routes/transactionsRoute.js';
import rateLimiter from './middleware/rateLimiter.js';
import job from './config/cron.js';

const app = express();

// Start the cron job
if (process.env.NODE_ENV === "production") job.start();

// middleware
app.use(rateLimiter);
app.use(express.json());


const PORT = process.env.PORT || 4000;

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// our custom simple middleware
// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is", req.method);
//   next();
// });

app.use("/api/transactions", transactionsRoute);

connectdb().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
})

