import express from "express";
import {
  getAllCafes,
  getCafeById,
  createCafes,
  updateCafes,
  deleteCafes,
} from "../../src/controllers/cafesController.js";

const router = express.Router();

router.get("/cafes", getAllCafes);
router.get("/cafes/:id", getCafeById);
router.post("/cafes", createCafes);
router.put("/cafes/:id", updateCafes);
router.delete("/cafes/:id", deleteCafes);

export default router;
