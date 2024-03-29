import {
  getCafes,
  cafeById,
  createCafe,
  updateCafeDb,
  deleteCafeDb,
} from "../models/cafeModel.js";
import { findError } from "../utils/utils.js";

const getAllCafes = async (req, res) => {
  try {
    const cafes = await getCafes();
    res.status(200).json({ cafes: cafes });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const getCafeById = async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await cafeById(id);
    if (!cafe) {
      res.status(400).send({
        message: "There's already a coffee with this id",
      });
    } else {
      res.status(200).json({ cafe: cafe });
    }
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const createCafes = async (req, res) => {
  try {
    const { cafe } = req.body;
    const okProperties = cafe.nombre;

    if (!cafe || !cafe.nombre || !okProperties) {
      res.status(400).json({
        message: "The cafe name is required to add",
      });
    } else {
      const newCafe = await createCafe(cafe);
      res.status(201).json({ cafe: newCafe });
    }
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

const updateCafes = async (req, res) => {
  try {
    const { id } = req.params;
    const { cafe } = req.body;
    const cafeId = parseInt(id, 10);
    if (!cafe || !cafe.nombre || !cafe.id || cafe.id !== cafeId) {
      res.status(400).json({
        message: "All the appropriate ones are necessary to update Cafe",
      });
    } else {
      const cafeForUpdate = await updateCafeDb(id, cafe);
      res.status(200).json({ cafe: cafeForUpdate });
    }
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

const deleteCafes = async (req, res) => {
  try {
    const jwt1 = req.header("Authorization");
    if (!jwt1) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Missing JWT token" });
    }
    const { id } = req.params;
    const deleteCafeCount = await deleteCafeDb(id);
    if (deleteCafeCount === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0].status)
      .json({ error: errorFound[0].message });
  }
};

export { getAllCafes, getCafeById, createCafes, updateCafes, deleteCafes };
