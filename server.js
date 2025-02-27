import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/UserRoute.js';
import loginRoute from './Routes/LoginRoute.js'
import taskRoute from './Routes/TaskRoute.js'

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

app.use("/api", userRoutes); 
app.use("/api", loginRoute);
app.use("/api", taskRoute);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
