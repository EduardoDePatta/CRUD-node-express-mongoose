const router = require("express").Router();

const { application, Router } = require("express");
const Pizza = require("../models/Pizza");

//create
router.post("/", async (req, res) => {
  // req.body
  const { flavor, price, cost, stuffedCrust } = req.body;

  if (!flavor) {
    res.status(422).json({ error: "É obrigatório adicionar um sabor." });
    return;
  }

  const pizza = {
    flavor,
    price,
    cost,
    stuffedCrust,
  };

  try {
    await Pizza.create(pizza);

    res.status(201).json({ message: "Pizza inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//read
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //extrair dado da req, pela url = req.params
  const id = req.params.id;

  try {
    const pizza = await Pizza.findOne({ _id: id });

    if (!pizza) {
      res.status(424).json({ message: "Pizza não encontrada" });
      return;
    }

    res.status(200).json(pizza);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//update (PUT, PATCH)
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { flavor, price, cost, stuffedCrust } = req.body;

  const pizza = {
    flavor,
    price,
    cost,
    stuffedCrust,
  };

  try {
    const updatedPizza = await Pizza.updateOne({ _id: id }, pizza);

    if (updatedPizza.matchedCount === 0) {
      res.status(424).json({ message: "Pizza não encontrada" });
    }

    res.status(200).json(pizza);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//delete

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const pizza = await Pizza.findOne({ _id: id });

  if (!pizza) {
    res.status(424).json({ message: "Pizza não encontrada" });
    return;
  }

  try {
    await Pizza.deleteOne({ _id: id });
    res.status(200).json({ message: "Pizza removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
