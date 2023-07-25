import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { sendArrayDataToClient } from "../../handlers/responseHandler.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  // Specify the path to your HTML file
  const filePath = path.join(__dirname, "../../../public/index.html");

  // Send the file as the response
  res.sendFile(filePath);
});

router.get("/get-stocks", async (req, res) => {
  const budget = req.query.budget;
  // Process the budget value as needed
  console.log("Budget:", budget);
  // ... Perform other operations with the budget value

  // Send response back to the client
  res.send("Budget received");
});

export default router;