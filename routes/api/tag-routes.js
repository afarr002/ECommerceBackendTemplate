const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }, { model: Category }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tg = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }, { model: Category }],
    });

    if (!tg) {
      res.status(404).json({
        message: "No tags found with that ID!",
      });
      return;
    }

    res.status(200).json(tg);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  try {
    const tg = await Tag.create(req.body);
    res.status(200).json(tg);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tg = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tg) {
      res.status(404).json({
        message: "No tags found with that ID!",
      });
      return;
    }

    res.status(200).json(tg);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const tg = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tg) {
      res.status(404).json({
        messgae: "No tag found with that ID!",
      });
      return;
    }

    res.status(200).json(tg);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
