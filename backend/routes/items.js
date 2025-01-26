const router = require("express").Router();
const pool = require("../db");

// Create item
router.post("/", async (req, res) => {
  try {
    const { name, description, rental_fee, collateral, days_limit, images } =
      req.body;
    const newItem = await pool.query(
      "INSERT INTO Items (name, description, rental_fee, collateral, days_limit, images, status) VALUES($1, $2, $3, $4, $5, $6, 'Listed') RETURNING *",
      [name, description, rental_fee, collateral, days_limit, images]
    );
    res.json(newItem.rows[0]);
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
    } = req.body;
    const updateItem = await pool.query(
      "UPDATE items SET name = $1, description = $2, rental_fee = $3, collateral = $4, days_limit = $5, images = $6, status = $7 WHERE id = $8 RETURNING *",
      [
        name,
        description,
        rental_fee,
        collateral,
        days_limit,
        images,
        status,
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
