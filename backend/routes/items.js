const router = require("express").Router();
const pool = require("../db");

// Create item
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      rental_fee,
      collateral,
      days_limit,
      images,
      email,
    } = req.body;

    // Begin transaction
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // First, create the item with days_rented = 0
      const newItem = await client.query(
        "INSERT INTO Items (name, description, rental_fee, collateral, days_limit, days_rented, images, status) VALUES($1, $2, $3, $4, $5, 0, $6, 'Listed') RETURNING *",
        [name, description, rental_fee, collateral, days_limit, images]
      );

      // Then, create the lender entry using the returned item id
      await client.query(
        "INSERT INTO Lender (item_id, email, is_picked_up, is_returned) VALUES($1, $2, false, false)",
        [newItem.rows[0].id, email]
      );

      await client.query("COMMIT");
      res.json(newItem.rows[0]);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM Items");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get ledger items (items with status Renting or Returned)
router.get("/ledger", async (req, res) => {
  try {
    const query = `
      SELECT 
        i.*,
        l.email as lender_email,
        r.email as renter_email
      FROM 
        Items i
        LEFT JOIN Lender l ON i.id = l.item_id
        LEFT JOIN Renter r ON i.id = r.item_id
      WHERE 
        i.status IN ('Renting', 'Returned')
      ORDER BY
        i.id DESC;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get item by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    res.json(item.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Update item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      rental_fee,
      collateral,
      days_limit,
      images,
      status,
      days_rented,
    } = req.body;
    const updateItem = await pool.query(
      "UPDATE items SET name = $1, description = $2, rental_fee = $3, collateral = $4, days_limit = $5, images = $6, status = $7, days_rented = $8 WHERE id = $9 RETURNING *",
      [
        name,
        description,
        rental_fee,
        collateral,
        days_limit,
        images,
        status,
        days_rented,
        id,
      ]
    );
    res.json(updateItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
    res.json("Item was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
