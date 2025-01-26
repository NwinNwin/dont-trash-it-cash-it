const router = require("express").Router();
const pool = require("../db");

// Create lender record
router.post("/", async (req, res) => {
  try {
    const { item_id, email } = req.body;
    const newLender = await pool.query(
      "INSERT INTO Lender (item_id, is_picked_up, is_returned, email) VALUES($1, false, false, $2) RETURNING *",
      [item_id, email]
    );
    res.json(newLender.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get all lenders
router.get("/", async (req, res) => {
  try {
    const allLenders = await pool.query("SELECT * FROM Lender");
    res.json(allLenders.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get lender and item details by item_id
router.get("/:item_id", async (req, res) => {
  try {
    const { item_id } = req.params;

    // Query to join the Lender and Items tables
    const query = `
      SELECT 
        Lender.*, 
        Items.* 
      FROM 
        Lender 
      INNER JOIN 
        Items 
      ON 
        Lender.item_id = Items.id 
      WHERE 
        Lender.item_id = $1;
    `;

    const result = await pool.query(query, [item_id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No lender or item found with this item_id" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Update lender status
router.put("/:item_id", async (req, res) => {
  try {
    const { item_id } = req.params;
    const { is_picked_up, is_returned } = req.body;
    const updateLender = await pool.query(
      "UPDATE lender SET is_picked_up = $1, is_returned = $2 WHERE item_id = $3 RETURNING *",
      [is_picked_up, is_returned, item_id]
    );
    res.json(updateLender.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Delete lender record
router.delete("/:item_id", async (req, res) => {
  try {
    const { item_id } = req.params;
    await pool.query("DELETE FROM lender WHERE item_id = $1", [item_id]);
    res.json("Lender record was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get all items for a lender by email
router.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const query = `
      SELECT 
        Items.*,
        Lender.is_picked_up,
        Lender.is_returned,
        Lender.email as lender_email
      FROM 
        Lender 
      INNER JOIN 
        Items 
      ON 
        Lender.item_id = Items.id 
      WHERE 
        Lender.email = $1
      ORDER BY
        Items.id DESC;
    `;

    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No items found for this lender" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
