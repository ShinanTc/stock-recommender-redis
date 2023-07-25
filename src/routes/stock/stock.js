import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  // Specify the path to your HTML file
  const filePath = path.join(__dirname, "../../../public/index.html");

  // Send the file as the response
  res.sendFile(filePath);
});

export default router;
