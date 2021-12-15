const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const ctgy = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!ctgy) {
      res.status(404).json({ message: "No categories found with that ID!" });
      return;
    }

    res.status(200).json(ctgy);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  try {
    const ctgy = await Category.create(req.body);
    res.status(200).json(ctgy);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const ctgy = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!ctgy[0]) {
      res.status(404).json({
        message: "No categories found with that ID!",
      });
      return;
    }

    res.status(200).json(ctgy);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const ctgy = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!ctgy) {
      res.status(404).json({
        message: "No category found with that ID!",
      });
      return;
    }

    res.status(200).json(ctgy);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
