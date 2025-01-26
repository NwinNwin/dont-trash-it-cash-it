const router = require("express").Router();
const pool = require("../db");

// Create renter record
router.post("/", async (req, res) => {
  try {
    const { item_id, email } = req.body;
    const newRenter = await pool.query(
      "INSERT INTO Renter (item_id, is_picked_up, is_returned, email) VALUES($1, false, false, $2) RETURNING *",
      [item_id, email]
    );
    res.json(newRenter.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get all renters
router.get("/", async (req, res) => {
  try {
    const allRenters = await pool.query("SELECT * FROM renter");
    res.json(allRenters.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get renter and item details by item_id
router.get("/:item_id", async (req, res) => {
  try {
    const { item_id } = req.params;

    // Query to join the Renter and Items tables
    const query = `
      SELECT 
        Renter.*, 
        Items.* 
      FROM 
        Renter 
      INNER JOIN 
        Items 
      ON 
        Renter.item_id = Items.id 
      WHERE 
        Renter.item_id = $1;
    `;

    const result = await pool.query(query, [item_id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No renter or item found with this item_id" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Update renter status
router.put("/:item_id", async (req, res) => {
  try {
    const { item_id } = req.params;
    const { is_picked_up, is_returned } = req.body;
    const updateRenter = await pool.query(
      "UPDATE renter SET is_picked_up = $1, is_returned = $2 WHERE item_id = $3 RETURNING *",
      [is_picked_up, is_returned, item_id]
    );
    res.json(updateRenter.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Delete renter record
router.delete("/:item_id", async (req, res) => {
  try {
    const { item_id } = req.params;
    await pool.query("DELETE FROM renter WHERE item_id = $1", [item_id]);
    res.json("Renter record was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get all items for a renter by email
router.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const query = `
      SELECT 
        Items.*,
        Renter.is_picked_up,
        Renter.is_returned,
        Renter.email as renter_email
      FROM 
        Renter 
      INNER JOIN 
        Items 
      ON 
        Renter.item_id = Items.id 
      WHERE 
        Renter.email = $1
      ORDER BY
        Items.id DESC;
    `;

    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No items found for this renter" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
