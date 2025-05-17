import express from "express";
import fs from "fs";
import csv from "csv-parser";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";
import { initCache } from "./controllers/productController.js";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allowedOrigins = [
  process.env.URL_ONE,
  process.env.URL_TWO,
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const buffer = [];
fs.createReadStream(path.join(__dirname, "MOCK_DATA_MED.csv"))
  .pipe(csv())
  .on("data", (row) => buffer.push(row))
  .on("end", () => initCache(buffer))
  .on("error", (error) => {
    console.error("Error reading CSV file:", error);
  });

app.get('/', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});


app.use('/api', productRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
