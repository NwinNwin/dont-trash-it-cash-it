const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create carbon data
router.post("/", async (req, res) => {
  try {
    const {
      item_id,
      category,
      material_composition,
      estimated_weight_kg,
      country_of_origin,
      transportation_distance_km,
      transport_mode,
      usage_energy_kWh_per_year,
      lifetime_years,
      disposal_method,
    } = req.body;

    const newCarbon = await pool.query(
      `INSERT INTO Carbon (
        item_id,
        category,
        material_composition,
        estimated_weight_kg,
        country_of_origin,
        transportation_distance_km,
        transport_mode,
        usage_energy_kWh_per_year,
        lifetime_years,
        disposal_method
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
      [
        item_id,
        category,
        material_composition,
        estimated_weight_kg,
        country_of_origin,
        transportation_distance_km,
        transport_mode,
        usage_energy_kWh_per_year,
        lifetime_years,
        disposal_method,
      ]
    );

    res.json(newCarbon.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get all carbon data
router.get("/", async (req, res) => {
  try {
    const allCarbon = await pool.query(
      `SELECT c.*, i.name as item_name 
       FROM Carbon c 
       JOIN Items i ON c.item_id = i.id 
       ORDER BY c.item_id DESC`
    );
    res.json(allCarbon.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get carbon data by item_id
router.get("/item/:item_id", async (req, res) => {
  try {
    const { item_id } = req.params;
    const carbon = await pool.query(
      `SELECT c.*, i.name as item_name 
       FROM Carbon c 
       JOIN Items i ON c.item_id = i.id 
       WHERE c.item_id = $1`,
      [item_id]
    );

    if (carbon.rows.length === 0) {
      return res.status(404).json("Carbon data not found for this item");
    }

    res.json(carbon.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get carbon data by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carbon = await pool.query(
      `SELECT c.*, i.name as item_name 
       FROM Carbon c 
       JOIN Items i ON c.item_id = i.id 
       WHERE c.id = $1`,
      [id]
    );

    if (carbon.rows.length === 0) {
      return res.status(404).json("Carbon data not found");
    }

    res.json(carbon.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Update carbon data
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      material_composition,
      estimated_weight_kg,
      country_of_origin,
      transportation_distance_km,
      transport_mode,
      usage_energy_kWh_per_year,
      lifetime_years,
      disposal_method,
    } = req.body;

    const updateCarbon = await pool.query(
      `UPDATE Carbon SET 
        category = $1,
        material_composition = $2,
        estimated_weight_kg = $3,
        country_of_origin = $4,
        transportation_distance_km = $5,
        transport_mode = $6,
        usage_energy_kWh_per_year = $7,
        lifetime_years = $8,
        disposal_method = $9
      WHERE id = $10 
      RETURNING *`,
      [
        category,
        material_composition,
        estimated_weight_kg,
        country_of_origin,
        transportation_distance_km,
        transport_mode,
        usage_energy_kWh_per_year,
        lifetime_years,
        disposal_method,
        id,
      ]
    );

    if (updateCarbon.rows.length === 0) {
      return res.status(404).json("Carbon data not found");
    }

    res.json(updateCarbon.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Delete carbon data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCarbon = await pool.query(
      "DELETE FROM Carbon WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleteCarbon.rows.length === 0) {
      return res.status(404).json("Carbon data not found");
    }

    res.json("Carbon data deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
