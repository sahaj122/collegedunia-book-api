import express from "express"
import cors from "cors"
import bookRoutes from './routes/book.routes.js';

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

// JSON payloads larger than 16 kilobytes will be rejected (To avoid server overload)
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// Routes
app.use('/api', bookRoutes);

export { app }