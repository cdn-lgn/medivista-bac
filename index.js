import express from "express";
import fs from "fs";
import csv from "csv-parser";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";
import { initCache } from "./controllers/productController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const buffer = []
fs.createReadStream(path.join(__dirname, "MOCK_DATA_MED.csv"))
  .pipe(csv())
  .on("data", (row) => buffer.push(row))
  .on("end", () => initCache(buffer))
  .on("error", (error) => {
    console.error("Error reading CSV file:", error);
  }
);

app.use("/", productRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
