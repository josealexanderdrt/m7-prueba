import pool from "../../config/db/conectionDb.js";
import format from "pg-format";

const getCafes = async () => {
  const SQLquery = { text: "SELECT * FROM cafes" };
  const response = await pool.query(SQLquery);
  return response.rows;
};


const cafeById = async (id) => {
    const SQLquery = {
      text: "SELECT * FROM cafes WHERE id = $1",
      values: [id],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  }


  const createCafe = async ({ nombre }) => {
    const SQLquery = {
      text: "INSERT INTO cafes (nombre) VALUES ($1) RETURNING *",
      values: [nombre],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  };


  const updateCafeDb = async (id ,{ nombre }) => {
    const SQLquery = {
      text: "UPDATE cafes SET nombre = $1 WHERE id = $2 RETURNING *",
      values: [nombre, id],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  };



  const deleteCafeDb = async (id) => {
    const SQLquery = {
      text: "DELETE FROM cafes WHERE id = $1",
      values: [id],
    };
    const response = await pool.query(SQLquery);
    return response.rowCount;
  };


  
  export {
    getCafes, cafeById, createCafe, updateCafeDb, deleteCafeDb
  };
  